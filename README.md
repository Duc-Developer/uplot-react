<h1 style="color:#cb3837">Documentation</h1>

<ul>
    <li><a href="doc:introduction">Introduction</a></li>
    <li><a href="doc:getting_started">Getting Started</a></li>
    <li><a href="doc:general">General</a></li>
    <li><a href="doc:configuration">Configuration</a></li>
    <li><a href="doc:axes">Axes</a></li>
</ul>

[1] [Introduction](#introduction)

This is Wrapper component for <a href="https://www.npmjs.com/package/uplotb" target="_blank">uplot</a> library (A small (~40 KB min), fast chart for time series, lines, areas, ohlc & bars).

[2] #getting_started "Getting Started"
```
    Install:
    npm i uplot-react-js
    or
    yarn add uplot-react-js
```

```
a) By default you must insert width and height into options property.
    <div style={{ width: '720px', height: '320px'}}>
        <UPlot 
            data={data} 
            options={options}
        />
    </div>
b) If you don't like it and you wan't to auto resize chart by parent element, you can insert autoResize = true in configs property.
    <div style={{ width: '720px', height: '320px'}}>
        <UPlot 
            data={data} 
            options={{
                ...options,
                autoResize: true
            }}
        />
    </div>
```

Components
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