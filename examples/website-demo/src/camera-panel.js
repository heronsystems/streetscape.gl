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

/* global window */
import React, {PureComponent} from 'react';
// import {XVIZPanel} from 'streetscape.gl';
import {_XVIZVideo as XVIZVideo} from 'streetscape.gl';
import {FloatPanel} from '@streetscape.gl/monochrome';

import {XVIZ_PANEL_STYLE, FLOAT_PANEL_STYLE} from './custom-styles';

const TITLE_HEIGHT = 28;

export default class CameraPanel extends PureComponent {
  state = {
    panelState: {
      x: window.innerWidth - 420,
      y: 20,
      width: 400,
      height: 300 + TITLE_HEIGHT,
      minimized: false
    }
  };

  componentWillReceiveProps(nextProps) {
    const {panelState} = this.state;
    if (this.props.videoAspectRatio !== nextProps.videoAspectRatio || this.props.selectedLogName !== nextProps.selectedLogName) {
      this.setState({
        panelState: {
          ...panelState,
          height: nextProps.selectedLogName === 'KITTI-0005' ? 148 : panelState.width / nextProps.videoAspectRatio + TITLE_HEIGHT
        }
      });
    }
  }

  _onUpdate = panelState => {
    const {videoAspectRatio, selectedLogName} = this.props;
    this.setState({
      panelState: {
        ...panelState,
        height: selectedLogName === 'KITTI-0005' ? 148 : panelState.width / videoAspectRatio + TITLE_HEIGHT
      }
    });
  };

  render() {
    const {log} = this.props;
    const {panelState} = this.state;

    let camerasArray = [];
    if(this.props.selectedLogName === "KITTI-0005") {
      camerasArray = ["/camera/image_02", "/camera/image_03"];
    }
    else if(this.props.selectedLogName === "nuTonomy-0006") {
      camerasArray = ["/camera/cam_front"];
    }
    else {
      camerasArray = [
        "/camera/MainForwardCamera",
        "/camera/NarrowForwardCamera",
        "/camera/WideForwardCamera",
        "/camera/ForwardLookingSideCamera_Right",
        "/camera/ForwardLookingSideCamera_Left",
        "/camera/RearwardLookingSideCamera_Right",
        "/camera/RearwardLookingSideCamera_Left",
        "/camera/RearViewCamera"
      ];
    }
    const cameras = camerasArray;

    return (
      <FloatPanel
        {...panelState}
        movable={true}
        minimizable={false}
        resizable={true}
        onUpdate={this._onUpdate}
        style={FLOAT_PANEL_STYLE}
      >
        {/* <XVIZPanel log={log} name="Camera" style={XVIZ_PANEL_STYLE} /> */}
        <XVIZVideo log={log} cameras={cameras} style={XVIZ_PANEL_STYLE.video} />
      </FloatPanel>
    );
  }
}
