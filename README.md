<h1 style="color:#cb3837">Documentation</h1>

1. [Introduction](#Introduction) <br/>
2. [Getting Started](#Getting_Started) <br/>
3. [General](#General) <br/>
4. [Configuration](#Configuration) <br/>
5. [Axes](#Axes) <br/>

### Introduction

This is Wrapper component for <a href="https://www.npmjs.com/package/uplot" target="_blank">uplot</a> library (A small (~40 KB min), fast chart for time series, lines, areas, ohlc & bars).

### Getting_Started

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

### General
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

<details><summary>Auto Resize</summary>
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