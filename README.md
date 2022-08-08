Install:
npm i uplot-react-js
or
yarn add uplot-react-js

This is package base on uplot library: https://github.com/leeoniya/uPlot

I. Components
```
import { UPlot } from 'uplot-react-js';
import type { UPlotProps } 'uplot-react-js';
```
| STT |     props     |      type                  |    default    |    required   |
| --- | ------------- | -------------------------- | ------------- | ------------- |
| 1   | id            | string                     | none          | no            |
| 2   | options       | options in UPlotProps      | none          | yes           |
| 3   | data          | data in UPlotProps         | none          | yes           |
| 4   | configs       | configs in UPlotProps      | none          | no            |

more configs in here : https://github.com/leeoniya/uPlot/tree/master/docs

Note: This is not the official version. Please wait for me to release v1.x.x version in the near future.