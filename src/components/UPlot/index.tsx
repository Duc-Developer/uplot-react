import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import uPlot from 'uplot';

import { UPlotProps } from 'models';
import { uuid, throttle } from 'utils';

import 'uplot/dist/uPlot.min.css';

const UPlot = ({ id, options, data, configs, handlers }: UPlotProps) => {
    const chartRef = useRef<any>();
    const target = useRef<any>();
    const wrapperRef = useRef<any>();
    const wrapperId = useMemo(() => id ?? uuid(), [id]);

    const throttleResize = throttle(({ width, height, uplot }: { width: number, height: number, uplot: any }) => {
        uplot?.setSize({ width, height });
    }, 300);

    const autoResizeChart = (_uPlot: any) => {
        if (!wrapperRef || !wrapperRef.current) return;
        const resizeObserverByWrapper = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                if (_uPlot.width === cr.width && _uPlot.height === cr.height) continue;
                let decreaseWidth = 0;
                let decreaseHeight = 0;
                const legendTable = document.getElementById(wrapperId)?.getElementsByClassName('u-legend')[0];
                if (legendTable) {
                    // decreaseWidth =
                    decreaseHeight = legendTable.clientHeight ?? 0;
                }
                const chartWidth = cr.width - decreaseWidth;
                const chartHeight = decreaseHeight > cr.height ? cr.height : cr.height - decreaseHeight;

                throttleResize({
                    width: chartWidth,
                    height: chartHeight,
                    uplot: _uPlot
                });
            }
        });
        resizeObserverByWrapper.observe(wrapperRef.current);
    };

    const initNewChart = (_opts: any, _data: any, _callback: (target: uPlot) => void) => {
        if (!_opts || !_data) {
            console.error('options and data is required!');
            return;
        }
        if (chartRef.current) {
            const newU = new uPlot(_opts, _data, chartRef.current);
            if (!configs?.autoResize && (!_opts.width || !_opts.height)) {
                console.warn('width and height must required in options if you do not use autoResize!');
            }
            if (configs && configs.autoResize) autoResizeChart(newU);
            _callback(newU);
        }
    };

    const cleanup = (_uPlot: any) => {
        if (_uPlot) _uPlot?.destroy();
    };

    useEffect(() => {
        initNewChart(options, data, (newU: any) => {
            target.current = newU;
            if (handlers && handlers.onCreated) handlers.onCreated(newU);
        });
        return () => {
            if (handlers && handlers.beforeDelete) handlers.beforeDelete(target.current);
            cleanup(target.current);
        };
    }, [options]);

    useEffect(() => {
        target?.current?.setData(data);
    }, [data]);

    useEffect(() => {
        return () => {
            chartRef.current = null;
        };
    }, []);

    // need check auto resize again
    return (
        <div
            id={wrapperId}
            ref={wrapperRef}
            style={{
                width: 'auto',
                height: '100%',
                ...configs?.wrapper?.style
            }}
            className={configs?.wrapper?.className ?? ''}
        >
            <div ref={chartRef}></div>
        </div>
    );
};

export default UPlot;
