import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import uPlot from 'uplot';

import { UPlotProps } from 'models';
import { uuid } from 'utils';

import '/node_modules/uplot/dist/uPlot.min.css';

const UPlot = ({ id, options, data, configs }: UPlotProps) => {
    const chartRef = useRef<any>();
    const target = useRef<any>();
    const wrapperRef = useRef<any>();
    const wrapperId = useMemo(() => id ?? uuid(), [id]);

    const autoResizeChart = (_uPlot: any) => {
        if (!wrapperRef || !wrapperRef.current) return;
        const legendTable = document.getElementById(wrapperId)?.getElementsByClassName('u-legend')[0];
        const resizeObserverByWrapper = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                if (_uPlot.width === cr.width && _uPlot.height === cr.height) continue;
                let decreaseWidth = 0;
                let decreaseHeight = 0;
                if (legendTable) {
                    // decreaseWidth =
                    decreaseHeight = legendTable.clientHeight;
                }
                const chartWidth = cr.width - decreaseWidth;
                const chartHeigh = cr.height - decreaseHeight;
                _uPlot.setSize({ width: chartWidth, height: chartHeigh });
            }
        });
        resizeObserverByWrapper.observe(wrapperRef.current);
    };

    const initNewChart = useCallback(
        (_opts: any, _data: any, _callback: (target: uPlot) => void) => {
            if (chartRef.current) {
                const newU = new uPlot(_opts, _data, chartRef.current);
                if (configs && configs.autoResize) {
                    const { wrapper } = configs;
                    if (!wrapper?.width || !wrapper?.height) {
                        console.warn('width height of wrapper must required for auto resize chart');
                    }
                    autoResizeChart(newU);
                }
                _callback(newU);
            }
        },
        [chartRef.current]
    );

    const cleanup = (_uPlot: any) => {
        if (_uPlot) {
            _uPlot?.destroy();
            chartRef.current = null;
        }
    };

    useEffect(() => {
        initNewChart(options, data, (newU: any) => {
            target.current = newU;
        });
        return () => {
            cleanup(target.current);
        };
    }, [options]);

    useEffect(() => {
        target?.current?.setData(data);
    }, [data]);

    return (
        <div
            id={wrapperId}
            ref={wrapperRef}
            style={{
                width: configs?.wrapper?.width ?? 'auto',
                height: configs?.wrapper?.height ?? 'auto',
                ...configs?.wrapper?.style
            }}
            className={configs?.wrapper?.className ?? ''}
        >
            <div ref={chartRef}></div>
        </div>
    );
};

export default UPlot;
