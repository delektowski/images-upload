/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");

exports.generateThumbnail = functions.storage
  .object()
  .onFinalize(async object => {
    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;
    if (!contentType.startsWith("image/")) {
      return console.log("This is not an image.");
    }

    const fileName = path.basename(filePath);
    if (object.metadata === undefined) {
      return console.log("Already a Thumbnail.");
    }
    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: contentType
    };
    await bucket.file(filePath).download({ destination: tempFilePath });
    console.log("Image downloaded locally to", tempFilePath);
    await spawn("convert", [
      tempFilePath,
      "-thumbnail",
      "750x550>",
      "-quality",
      "81",
      tempFilePath
    ]);
    console.log("Thumbnail created at", tempFilePath);
    const thumbFileName = `thumb_${fileName}`;
    await bucket.upload(tempFilePath, {
      destination: filePath,
      metadata: metadata
    });
    return fs.unlinkSync(tempFilePath);
  });
