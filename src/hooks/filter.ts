export default function desensitization(str: string) {
    const str1 = str.substr(0, 4);
    const str2 = str.substr(-4);
    const str3 = str1 + '****' + str2;
    return str3;
}
