import { AnyObject } from "@root/types";
import ms from "ms";

export interface MsResponse {
	ms: number;
	s: number;
	m: number;
	h: number;
	d: number;
	mn: number;
	y: number;
}

export default class Time {
  static ms(time: number, words?: boolean, seconds?: boolean, millis?: boolean, obj?: false): string;
	static ms(time: number, words: boolean, seconds: boolean, millis: boolean, obj: true): MsResponse;
	static ms(time: number, words = false, seconds = true, millis = false, obj = false) {
		if (time < 0) throw new TypeError("Negative time provided.");
		if (time === 0) return words ? "0 seconds" : "0s";
		const r = {
			// Number.EPSILON = https://stackoverflow.com/a/11832950
			ms: Math.round(((time % 1000) + Number.EPSILON) * 100) / 100,
			s: 0,
			m: 0,
			h: 0,
			d: 0,
			mn: 0,
			y: 0
		};
		r.y = Math.floor(time / 3.154e+10);
		time -= r.y * 3.154e+10;
		r.mn = Math.floor(time / 2.628e+9);
		time -= r.mn * 2.628e+9;
		r.d = Math.floor(time / 8.64e+7);
		time -= r.d * 8.64e+7;
		r.h = Math.floor(time / 3.6e+6);
		time -= r.h * 3.6e+6;
		r.m = Math.floor(time / 6e4);
		time -= r.m * 6e4;
		r.s = Math.floor(time / 1e3);
		time -= r.s * 1e3;

		if (obj) return r;

		const str: Array<string> = [];
		if (r.ms > 0 && ms) str.push(`${r.ms} millisecond${r.ms === 1 ? "" : "s"}`);
		if (r.s > 0) str.push(`${r.s} second${r.s === 1 ? "" : "s"}`);
		if (r.m > 0) str.push(`${r.m} minute${r.m === 1 ? "" : "s"}`);
		if (r.h > 0) str.push(`${r.h} hour${r.h === 1 ? "" : "s"}`);
		if (r.d > 0) str.push(`${r.d} day${r.d === 1 ? "" : "s"}`);
		if (r.mn > 0) str.push(`${r.mn} month${r.mn === 1 ? "" : "s"}`);
		if (r.y > 0) str.push(`${r.y} year${r.y === 1 ? "" : "s"}`);

		if (words && str.length > 1) str[0] = `and ${str[0]}`;

		if (!seconds) {
			if (words) {
				const e = str.find((v) => v.includes("second"));
				if (e) {
					str.splice(str.indexOf(e), 1);
					if (str.length < 1) str.push("less than 1 minute");
				}
			} else delete (r as AnyObject<number>).s;
		}


		if (!millis) {
			if (words) {
				const e = str.find((v) => v.includes("millisecond"));
				if (e) {
					str.splice(str.indexOf(e), 1);
					if (str.length < 1) str.push("less than 1 second");
				}
			} else {
				delete (r as AnyObject<number>).ms;
			}
		}


		return words ? str.reverse().join(", ") : Object.keys(r).filter((k) => (r as AnyObject<number>)[k] > 0).map((k) => `${Math.floor((r as AnyObject<number>)[k])}${k}`).reverse().reduce((a, b) => a + b, "");
	}

  static convert(input: number, type: "ms" | "mi" | "ns", dec = 3): string {
		input = parseFloat(input.toFixed(dec));
		switch (type) {
			case "ms": return input < 1000 ? `${input}ms` : this.ms(input, true, true, true);
			case "mi": return input < 1000 ? `${input}µs` : this.convert(input / 1000, "ms", dec);
			case "ns": return input < 1000 ? `${input}ns` : this.convert(input / 1000, "mi", dec);
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			default: return `${input}${type}`;
		}
	}
}