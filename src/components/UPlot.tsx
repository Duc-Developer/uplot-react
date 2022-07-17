import React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import uPlot, { Options, AlignedData } from 'uplot';
import { uniqueID } from '../utilities';

export type WrapperSize = {
    width: string | number;
    height: string | number;
};
export type UPlotChartProps = {
    data: AlignedData | any[];
    options: Options;
    configs: {
        wrapperSize?: WrapperSize;
        autoDestroy?: boolean;
        autoResize?: boolean;
    };
    handlers: {
        onCreated?: (uPlotTarget: uPlot) => void;
        beforeDestroy?: (uPlotTarget: uPlot) => void;
    };
    id?: string;
};

export const UPlot = ({
    data,
    options,
    configs: { wrapperSize: { width, height } = { width: 'auto', height: 'auto' }, autoDestroy, autoResize = true } = {},
    handlers: { onCreated, beforeDestroy } = {},
    id
}: UPlotChartProps) => {
    const chartElmRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null);
    const uPlotRef = useRef<uPlot | null>(null);

    const chartId = useMemo(() => id ?? `uPlot-chart-id-${uniqueID()}`, [id]);

    const initNewChart = useCallback(({ _options, _data }: any, callback: (target: uPlot) => void) => {
        const newUPlot = new uPlot(_options, _data, chartElmRef.current);
        if (autoResize) autoResizeChart(newUPlot);
        callback(newUPlot);
    }, []);

    const clear = (_uPlot: any) => {
        if (_uPlot) {
            beforeDestroy && beforeDestroy(_uPlot);
            _uPlot?.destroy();
            chartElmRef.current = null;
            uPlotRef.current = null;
        }
    };

    const autoResizeChart = (_uPlot: any) => {
        if (!wrapperRef || !wrapperRef.current) return;
        const legendTable = document.getElementById(chartId)?.getElementsByClassName('u-legend')[0];
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

    useEffect(() => {
        initNewChart(
            {
                _options: options,
                _data: data
            },
            (newU) => {
                uPlotRef.current = newU;
                if (onCreated) onCreated(newU);
            }
        );
        return () => {
            !autoDestroy && clear(uPlotRef.current);
        };
    }, [options]);

    useEffect(() => {
        if (uPlotRef?.current) {
            uPlotRef.current.setData(data as AlignedData);
        }
    }, [data]);

    return (
        <div id={chartId} ref={wrapperRef} style={{ width: width, height: height }}>
            <div ref={chartElmRef} />
        </div>
    );
};
