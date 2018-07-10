declare class Randomizer {
    seed: number;
    cursor: number;
    constructor(seed?: number, cursor?: number);
    private _last?;
    private _get;
    float(min?: number, max?: number): number;
    int(min?: number, max?: number): number;
    boolean(): boolean;
    string(radix?: number, upperCase?: boolean): string;
    reset(seed?: number): this;
}
declare const _default: Randomizer & {
    Randomizer: new (seed?: number | undefined) => Randomizer;
};
export default _default;
//# sourceMappingURL=index.d.ts.map