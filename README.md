<h1 style="color:#cb3837">Documentation</h1>

1. [Introduction](#Introduction) <br/>
2. [Getting Started](#Getting_Started) <br/>
3. [General](#General) <br/>
4. [Configuration](#Configuration) <br/>
5. [Axes](#Axes) <br/>

## Introduction

This is Wrapper component for <a href="https://www.npmjs.com/package/uplot" target="_blank">uplot</a> library (A small (~40 KB min), fast chart for time series, lines, areas, ohlc & bars).

## Getting_Started

Install:
```
    npm i uplot-react-js
    or
    yarn add uplot-react-js
```


First you need remove Strict Mode in index(.tsx | .ts) or index(.jsx | .js) files
```
Before: 
    ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <StrictMode>
        <App />
    </StrictMode>
    );

After:
    ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <>
        <App />
    </>
    );
```

## General
<a href="https://codesandbox.io/s/uplot-react-js-general-g900ii" rel="nofollow"><img src="https://camo.githubusercontent.com/90808661433696bc57dce8d4ad732307b5cec6270e6b846f114dcd7ee7f9458a/68747470733a2f2f636f646573616e64626f782e696f2f7374617469632f696d672f706c61792d636f646573616e64626f782e737667" alt="Edit yk7637p62z" data-canonical-src="https://codesandbox.io/static/img/play-codesandbox.svg" style="max-width:100%;"></a>

<details><summary>BASIC</summary>
a) By default you must insert width and height into options property.

```
    <div>
        <UPlot 
            data={data} 
            options={{
                ...options,
                width: '720px', 
                height: '320px'
            }}
        />
    </div>
```
</details>

<details><summary>AUTO RESIZE</summary>
b) If you don't like it and you wan't to auto resize chart by parent element, 
you can insert autoResize = true in configs property. And chart auto resize by parent element

```
    const randomWidth = Math.random()*1000;
    const randomHeight = Math.random()*1000;

    <div style={{ width: randomWidth, height: randomHeight}}>
        <UPlot 
            data={data} 
            options={{
                ...options,
                autoResize: true
            }}
        />
    </div>
```
</details>

## Configuration

| STT |     props     |      type                  |    default    |    required   |
| --- | ------------- | -------------------------- | ------------- | ------------- |
| 1   | id            | string                     | none          | no            |
| 2   | options       | [options](#options) in UPlotProps      | none          | yes           |
| 3   | data          | [data](#data) in UPlotProps         | none          | yes           |
| 4   | configs       | [configs](#config) in UPlotProps      | none          | no            |

### options
| Name | Type | Values | Default | Description |
| --- | ------ | --------- | ------ | ------ | 
| mode | number | 1 or 2 | 1 | 1: aligned & ordered, single-x / y-per-series,<br/> 2: unordered & faceted, per-series/per-point x,y,size,label,color,shape,etc. |
| title | string |  | none | chart title |
| id | string |  | none | id of chart uplot canvas |
| class | string |  | none | className to add to chart uplot canvas |
| width | number |  | none | width of chart |
| height | number |  | none | height of chart |
| data | uplot.AlignedData | [AlignedData](#AlignedData) | none |  |
| tzDate | function (uplot.LocalDateFromUnix) | [tzDate](#tzDate) | none | Converts a unix timestamp to Date that's time-adjusted for the desired timezone |
| fmtDate | function (uplot.DateFormatterFactory) | [fmtDate](#fmtDate) | none | Creates an efficient formatter for Date objects from a template string, e.g. {YYYY}-{MM}-{DD} */ |
| ms | number | 1e-3 or 1 | 1e-3 | timestamp multiplier that yields 1 millisecond |
| drawOrder | uplot.DrawOrderKey[] | 'axes' or 'series' | ["axes", "series"] | drawing order for axes/grid & series |
| pxAlign | boolean or number |  | true | whether vt & hz lines of series/grid/ticks should be crisp/sharp or sub-px antialiased |
| series | uplot.Series[] | coming soon... | coming soon... | coming soon... |
| bands | uplot.Band[] | coming soon... | coming soon... | coming soon... |
| scales | uplot.Scales[] | coming soon... | coming soon... | coming soon... |
| axes | uplot.Axis[] | coming soon... | coming soon... | coming soon... |
| padding | uplot.Padding|  | [top: PaddingSide, right: PaddingSide, bottom: PaddingSide, left: PaddingSide] | coming soon... |
| select | uplot.Select | [Select](#uplot.select) | coming soon... | coming soon... |
| legend | uplot.Legend | coming soon... | coming soon... | coming soon... |
| cursor | uplot.Cursor | coming soon... | coming soon... | coming soon... |
| focus | uplot.Focus | coming soon... | coming soon... | coming soon... |
| hooks | uplot.Hooks[] | coming soon... | coming soon... | coming soon... |
| plugins | uplot.Plugin[] | coming soon... | coming soon... | coming soon... |

### data
### config

Advance More:
#### AlignedData
In options.mode = 1, per xValue correspond with per yValue
```
{
    xValues: number[] | string[],
    yValues: any[]
}
```
<b style='color::#cb3837'>NOTE:</b> if xValues is time, it default is seconds, if you don't like it, you can config with <b>ms</b> in options config.

### tzDate
```
(ts: number) => Date
```
### fmtDate
```
(tpl: string) => (date: Date) => string
```
### uplot.select
div into which .u-select will be placed: .u-over or .u-under
```
{
    show?: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
    over?: boolean; // default true
}
```