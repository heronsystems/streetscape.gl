// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {load} from '@loaders.gl/core';
import {OBJLoader} from '@loaders.gl/obj';
import { stringify } from 'querystring';

/* eslint-disable camelcase */
// export const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
export const MAPBOX_TOKEN = 'pk.eyJ1IjoicGF0bm9sYW4zMyIsImEiOiJjaWprYWdxeTYwMzE2dHlsdGlnem5udWdjIn0.J9NzfFEQYACy70DmYcQsaA'; // eslint-disable-line

export const MAP_STYLE = 'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs';

// OBJ model width 2073mm, length 4946mm
// Volkswagen Passat: width 1820mm, length 4780mm
export const CAR = {
  mesh: load('./assets/car.obj', OBJLoader),
  origin: [1.08, -0.32, 0],
  scale: 0.0009,
  wireframe: true,
  color: [160, 160, 160]
};

export const SETTINGS = {
  viewMode: {
    type: 'select',
    title: 'View Mode',
    data: {TOP_DOWN: 'Top Down', PERSPECTIVE: 'Perspective', DRIVER: 'Driver'}
  }
};

// LOG_DIR is defined in webpack.config.js
/* eslint-disable no-undef */
const PORT = 3000
const DATA_PATH = './xviz_data'
const LOCAL_SERVER = 'http://localhost:' + PORT;
const Http = new XMLHttpRequest();
const url = 'http://localhost:' + (PORT+1) + '/get_subfolders';
Http.open("GET", url, false);
Http.send();
var subfolders = [];
if(Http.status === 200) {
  subfolders = JSON.parse(Http.responseText);
}

var logs = [];
subfolders.forEach(subfolder => {
  var log = {
    name: subfolder,
    path: `${LOCAL_SERVER}/` + subfolder,
    xvizConfig: {
      TIME_WINDOW: .4, // TODO: Play with this, may fix the two second issue with our logs when collected without the 0.5 second hack in collect_data.py
    },
    videoAspectRatio: 4/3
  }
  logs.push(log)
});
// Push test logs (KITTI and nuTonomy)
logs.push(
  {
    name: 'KITTI-0005',
    path: 'https://raw.githubusercontent.com/uber/xviz-data/master/kitti/2011_09_26_drive_0005_sync', // TODO: Get directory structure on local server so you can serve multiple data sources/runs
    xvizConfig: {
      TIME_WINDOW: 0.4
    },
    videoAspectRatio: 4 / 3
  }
);
logs.push(
  {
    name: 'nuTonomy-0006',
    path: `https://raw.githubusercontent.com/uber/xviz-data/master/nutonomy/scene-0006`,
    xvizConfig: {
      TIME_WINDOW: 0.2,
      PLAYBACK_FRAME_RATE: 16
    },
    videoAspectRatio: 16 / 9
  }
)
export const LOGS = logs;


export const MOBILE_NOTIFICATION = {
  id: 'mobile',
  message: 'Streetscape.gl demo can not run on mobile devices.'
};
