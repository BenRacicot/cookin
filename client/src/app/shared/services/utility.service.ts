import {Injectable} from '@angular/core';
import {formatDate} from '@angular/common';

import {FormControl, FormGroup, Validators} from '@angular/forms';

const isObject = (obj: any) => {
    return obj !== null && typeof obj === 'object';
};

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    public currencyChars = new RegExp('[.,]', 'g'); // remove commas and dots

    constructor() {}

    // static log(val: string) { console.log(val); }
    static trackByFn(index?: any, item?: {id: void}): void {
        if (index) {
            return index; // unique id corresponding to the item
        } else if (item) {
            return item.id; // unique id corresponding to the item
        }
    }

    // REUSABLE FORM SUBMISSION
    // public formSuccess(): void {
    //     if (this.success === false) {
    //         this.success = true;
    //         setTimeout(() => {
    //             this.success = false;
    //         }, 2000);
    //     }
    // }

    public coerceValues(values: {[key: string]: any}): {
        [key: string]: any;
    } {
        const coercedValues = {};

        for (const key of Object.keys(values)) {
            // keep null/NaN key/values out
            if (values[key] !== null && values[key] !== NaN) {
                if (values[key] === 'true' || values[key] === true) {
                    coercedValues[key] = true;
                    continue;
                }
                if (values[key] === 'false' || values[key] === false) {
                    coercedValues[key] = false;
                    continue;
                }

                // check length, because + coerces length of 0 to the value 0
                if (!isNaN(values[key]) && values[key].length !== 0) {
                    coercedValues[key] = +values[key];
                } else {
                    coercedValues[key] = values[key];
                }
            }
        }
        return coercedValues;
    }

    // convert monetary values to numerical
    public convertToNumber(value: string): number {
        if (typeof value !== 'string') {
            return value;
        }
        const converted: number = Number(value.replace(/[^0-9]/g, ''));
        return converted;
    }

    public convertToMonetary(val: any, locale: string = 'en-US'): any {
        // 1. sanitize val, remove unwanted chars
        const numberFormat = parseInt(
            String(val).replace(this.currencyChars, '')
        );
        // console.log(numberFormat); // raw number

        // 2. format the number (add commas)
        return formatDate(numberFormat, '1.0', locale);
    }

    /* ------------------------------------------------------------------------ *
        TEST OBJECT FOR EMPTY
    * ------------------------------------------------------------------------ */
    public isEmpty(obj: {[key: string]: any}) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    /* ------------------------------------------------------------------------ *
        TEST IF AN OBJECT OR STRING IS WITHIN AN ARRAY OF ITEMS
    * ------------------------------------------------------------------------ */
    public duplicates(obj: any, objs: any[]): boolean {
        const test = JSON.stringify(obj);
        let match: boolean;

        // test for duplicate objects in tag array
        for (let i = 0, j = objs.length; i < j; i++) {
            const controlVal = JSON.stringify(objs[i]);
            if (test === controlVal) {
                return true;
            } else {
                match = false;
            }
        }
        return match;
    }

    /* ------------------------------------------------------------------------ *

    * ------------------------------------------------------------------------ */
    public isToday(date: Date): boolean {
        return (
            new Date(date).setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0)
        );
    }

    /* ------------------------------------------------------------------------ *
        Get date
        today's date by default or send a date and then optionally add days to it
    * ------------------------------------------------------------------------ */
    public time(day?: Date, addDays?: number): any {
        let timeObj = {};
        let today = day ? day : new Date();

        if (addDays) {
            today.setDate(today.getDate() + addDays);
        }

        let dd = today.getDate().toString();
        let mm = (today.getMonth() + 1).toString();
        let yyyy = today.getFullYear();

        // add 0 to days if day is a single digit
        if (parseInt(dd) < 10) {
            dd = '0' + dd.toString();
        }
        // add 0 to month if month is a single digit
        if (parseInt(mm) < 10) {
            mm = '0' + mm.toString();
        }

        // "date is formatted according to ISO8601" yyyy-mm-dd
        // developer.mozilla.org / en - US / docs / Web / HTML / Element / input / date
        timeObj['formatted'] = yyyy + '-' + mm + '-' + dd;
        timeObj['day'] = dd;
        timeObj['month'] = dd;

        return timeObj;
    }

    // calculate days between two ISO8601 formatted dates yyyy-mm-dd
    public betweenDays(end: string, start?: string): any {
        const startDay = start ? start : new Date();
        const timeDiff = +new Date(startDay) - +new Date(end);
        const days = timeDiff / (1000 * 60 * 60 * 24);

        return days;
    }

    clockTime(d: any) {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor((d % 3600) / 60);
        let s = Math.floor((d % 3600) % 60);

        let hDisplay = h > 0 ? h + ':' : '';
        let mDisplay = m > 0 ? m + ':' : '00:';
        let sDisplay = s > 0 ? s : '00';
        return hDisplay + mDisplay + sDisplay;
    }

    // https://stackoverflow.com/a/9640417/1440240
    hmsToSeconds(str: any): number {
        if (str.includes(':')) {
            let p = str.split(':'),
                s = 0,
                m = 1;

            while (p.length > 0) {
                s += m * parseInt(p.pop(), 10);
                m *= 60;
            }
            return s;
        }
        return str;
    }

    removeEmptyProperties(obj: any) {
        Object.keys(obj).forEach(
            (key) =>
                (obj[key] === null ||
                    obj[key] === 'null' ||
                    obj[key] === undefined ||
                    obj[key] === 'undefined' ||
                    obj[key] === NaN ||
                    obj[key] === 'NaN') &&
                delete obj[key]
        );
        return obj;
    }

    isSame(v1: any, v2: any) {
        (Array.isArray(v1) || isObject(v1)) && (v1 = JSON.stringify(v1));
        (Array.isArray(v2) || isObject(v2)) && (v2 = JSON.stringify(v2));
        return v1 === v2;
    }

    // https://stackblitz.com/edit/angular-example-username-directive?file=src%2Fapp%2Fusername.directive.ts
    collectHashtags(text: string): string[] {
        const regex = /#[0-9a-zA-Z]/;
        const words = text.split(' ');
        let hashtags = [];

        for (let i = 0, j = words.length; i < j; i++) {
            if (regex.test(words[i])) {
                hashtags.push(words[i]);
            }
        }
        return hashtags;
    }

    // https://stackoverflow.com/a/2117523/1440240
    // generate unique UUIDs
    uuid(): string {
        return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(
            /[018]/g,
            (c: any) =>
                (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] &
                        (15 >> (c / 4)))
                ).toString(16)
        );
    }

    parseURL(url: string): any {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }
}
