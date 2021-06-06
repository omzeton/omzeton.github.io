export interface SVGShape {
    path: string;
    pathAlt: string;
    scaleX: number;
    scaleY: number;
    rotate: number;
    tx: number;
    ty: number;
    fill: {
        color: string;
        duration: number;
        easing: string;
    };
    animation: {
        path: {
            duration: number;
            easing: string;
            elasticity: number;
        };
        svg: {
            duration: number;
            easing: string;
        };
    };
}
