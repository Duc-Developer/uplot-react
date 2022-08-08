import { AlignedData, Options } from 'uplot';

export type UPlotProps = {
    id?: string;
    options: Options;
    data: AlignedData | any[];
    configs?: {
        autoResize: false;
        wrapper?: {
            width?: number | string;
            height?: number | string;
            style?: any;
            className?: string;
        };
    };
    handlers?: {
        onCreated?: (newTarget: uPlot) => void;
        beforeDelete?: (newTarget: uPlot) => void;
    };
};
