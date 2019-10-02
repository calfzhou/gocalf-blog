google = {};
(function () {
var e = null;
function g() { this.n = [] }
g.prototype.push = function (a) { this.n.push(a) };
g.prototype.clear = function () { this.n = [] };
g.prototype.h = function (a, b, c) {
this.n.sort(function (a, b) { return b.m - a.m });
for (var d = this.n.length, f = 0; f < d; f++)
this.n[f].h(a, c), !(this.n[f] instanceof h) && this.n[f].h(b, c, !0)
};
function aa(a, b) { this.F = a; this.G = b }
var m = function (a, b) {
for (var c = i, d = c.n.length - 1; d >= 0; d--) {
var f = c.n[d];
if (f.U && !(f.F == e || !f.fill || !f.U(a, b))) return new aa(f.F, f.G)
}
return e
};
function n(a, b) {
var c;
c = document.createElement("div");
c.innerHTML = "Alexander Calder&#39;s 113th Birthday. Courtesy of Calder Foundation / ARS, NY.";
this.P = c = c.childNodes.length === 0 ? "Alexander Calder&#39;s 113th Birthday. Courtesy of Calder Foundation / ARS, NY." : c.childNodes[0].nodeValue;
this.M = "";
var d = c.lastIndexOf(". ");
if (d >= 1 && !c.charAt(d - 1).match(/[0-9]/))
this.P = c.substring(0, d), this.M = c.substring(d + 2);
this.da = "https://www.google.com/search?q=Alexander+Calder&ct=calder11&oi=ddle";
this.Z = a; this.$ = b; this.u = this.o = 0;
this.C = !1; this.Q = 0; this.D = this.R = e
}
n.prototype.h = function (a) {
a.font = "normal 12px helvetica,arial,sans-serif";
var b = a.measureText(this.P);
a.save();
a.translate(this.Z, this.$);
var c = "rgba(34,0,193," + this.o + ")";
if (this.C) a.lineWidth = 0.5, a.beginPath(), a.strokeStyle = c, a.moveTo(-b.width / 2, 2), a.lineTo(b.width / 2, 2), a.stroke();
a.textAlign = "center";
a.fillStyle = c;
a.fillText(this.P, 0, 0);
if (this.M && (a.fillText(this.M, 0, 14), this.C))
b = a.measureText(this.M), a.beginPath(), a.strokeStyle = c, a.moveTo(-b.width / 2, 16), a.lineTo(b.width / 2, 16), a.stroke();
a.restore()
};
var o = eval("(function(a,n){return a" + "%%".charAt(0) + "n;})");
function ba() {
var a = p.width, b = p.height;
return function (c, d) {
var f = c[2], f = [a * (c[0] / (1.25 + f)), b * (c[1] / (1.25 + f))]; d && (f[1] = 0.25 * f[1] + b / 4);
return f
}
}
function q(a, b) {
var c = Math.cos(b), d = Math.sin(b);
return [c * a[0] + d * a[2], a[1], -d * a[0] + c * a[2]]
}
function r(a, b) {
var c = Math.cos(b), d = Math.sin(b);
return [c * a[0] - d * a[1], d * a[0] + c * a[1], a[2]]
}
function s(a, b) {
return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
};
function t(a, b, c) {
this.s = a; this.H = b; this.p = this.j = c; this.b = { y: 0, z: 0 };
this.A = { y: 0, z: 0 }; this.i = { y: 0, z: 0 }; this.k = { y: 0, z: 0 }; this.g = { y: 0, z: 0 }
}
t.prototype.transform = function () {
for (var a = 0; a < this.s.length; a++) this.s[a].transform(this.b, this.p);
for (a = 0; a < this.H.length; a++) this.H[a].transform(this.b, this.p)
};
function u(a, b, c) {
this.a = a; this.w = b; this.T = c
}
u.prototype.transform = function () {
for (var a = this.a.length, b = 0; b < a; b++) this.a[b].transform();
this.w.transform({ y: 0, z: 0 }, [0, 0, 0]);
this.w.e[0].tv = this.a[a - 1].p;
this.T.transform({ y: 0, z: 0 }, [0, 0, 0])
};
u.prototype.h = function (a, b, c, d) {
this.T.h(b, d); this.w.h(b, d);
for (var f = 0; f < this.a.length; f++) {
for (var j = this.a[f], k = a, l = 0; l < j.s.length; l++)
k.push(j.s[l]);
for (l = 0; l < j.H.length; l++) k.push(j.H[l])
} a.h(b, c, d)
};
function h(a, b, c, d) {
this.stroke = b; this.fill = a; this.aa = c; this.ba = d; this.m = -Infinity
}
h.prototype.transform = function (a, b) {
this.V = s(r(q(this.aa, a.y), a.z), b);
this.m = this.V[2]
};
h.prototype.h = function (a, b) {
a.beginPath(); var c = b(this.V); a.arc(c[0], c[1], this.ba, 0, Math.PI * 2, !0);
a.closePath(); this.fill ? (a.fillStyle = this.fill, a.fill()) : (a.strokeStyle = this.stroke, a.stroke())
};
function v(a, b, c) {
this.r = a; this.O = b; this.N = c
}
var w = new v(255, 255, 255);
function x(a, b, c) {
this.fill = a; var d = a.match(/#(..)(..)(..)/);
this.Y = a && d && d.length == 4 ? new v(parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16)) : e; this.stroke = b;
this.e = c; this.m = 0; this.d = { J: 0, I: 0, L: 0, K: 0 }
}
x.prototype.transform = function (a, b) {
var c = this.e.length; this.m = -Infinity;
for (var d = 0; d < c; d++) {
var f = this.e[d]; f.tv = s(r(q(f.v, a.y), a.z), b);
this.m = Math.max(this.m, f.tv[2]);
if (f.c) f.tc0 = s(r(q(f.c[0], a.y), a.z), b), f.tc1 = s(r(q(f.c[1], a.y), a.z), b)
}
};
x.prototype.h = function (a, b, c) {
if (!c) this.d.J = Infinity, this.d.I = -Infinity, this.d.L = Infinity, this.d.K = -Infinity; a.beginPath();
for (var d = this.e.length, f = 0; f < d; f++) {
var j = b(this.e[f].tv, c);
if (!c) {
var k = j; this.d.J = Math.min(this.d.J, k[0]);
this.d.I = Math.max(this.d.I, k[0]); this.d.L = Math.min(this.d.L, k[1]);
this.d.K = Math.max(this.d.K, k[1])
}
if (this.e[f].c) {
var k = b(this.e[f].tc0, c), l = b(this.e[f].tc1, c);
a.bezierCurveTo(k[0], k[1], l[0], l[1], j[0], j[1])
}
else this.e[f].t ? a.lineTo(j[0], j[1]) : a.moveTo(j[0], j[1])
}
if (this.fill) {
if (c) y(a, !0);
else {
a.shadowBlur = 0; b = this.fill;
if (this.m > 0)
b = this.Y, c = this.m / 4, b = (new v((1 - c) * b.r + c * w.r, (1 - c) * b.O + c * w.O, (1 - c) * b.N + c * w.N)).toString();
c = a.createLinearGradient(0, -5 * a.canvas.height, 0, 5 * a.canvas.height); c.addColorStop(0, "#ffffff"); c.addColorStop(0.5, b); c.addColorStop(1, "#000000"); a.fillStyle = c
} a.fill()
}
else c ? y(a, !1) : (a.shadowBlur = 0, a.strokeStyle = this.stroke), a.stroke()
};
x.prototype.U = function (a, b) {
return a >= this.d.J && a <= this.d.I && b >= this.d.L && b <= this.d.K
};
var y = function (a, b) { b ? a.fillStyle = "#f0f0f0" : a.strokeStyle = "#f0f0f0"; a.shadowBlur = 5; a.shadowColor = "#f0f0f0" };
v.prototype.toString = function () {
return "rgb(" + z(this.r) + "," + z(this.O) + "," + z(this.N) + ")"
};
function z(a) {
return Math.round(Math.max(0, Math.min(a, 255)))
};
var B = new u([new t([new x("", "#1B3281", [{ v: [-0.3174, -0.1721, 0]}]), new x("", "#999999", [{ v: [-0.0265, 0.0278, 0] }, { c: [[-0.0207, 0.0206, 0], [-0.0054, 0.0037, 0]], v: [0.0163, -0.0049, 0]}]), new x("#1B3281", "", [{ v: [-0.0263, 0.0278, 0] }, { c: [[-0.0263, 0.0278, 0], [-0.0392, 0.0186, 0]], v: [-0.0631, 0.0346, 0] }, { c: [[-0.0631, 0.0346, 0], [-0.0725, 0.0392, 0]], v: [-0.072, 0.0575, 0] }, { c: [[-0.072, 0.0575, 0], [-0.0719, 0.1059, 0]], v: [-0.0565, 0.092, 0] }, { c: [[-0.0565, 0.092, 0], [-0.0323, 0.0646, 0]], v: [-0.0263, 0.0278, 0]}]), new x("#1B3281", "", [{ v: [0.0376, -0.0321, 0] }, { c: [[0.0249, -0.0329, 0], [0.016, -0.0051, 0]], v: [0.016, -0.0051, 0] }, { c: [[0.0243, 0.0088, 0], [0.0472, 0.0143, 0]], v: [0.0472, 0.0143, 0] }, { c: [[0.0529, 0.0153, 0], [0.0549, 0.0106, 0]], v: [0.0553, 0.0045, 0] }, { c: [[0.0553, -0.003, 0], [0.0538, -0.0274, 0]], v: [0.0376, -0.0321, 0]}])], [new h("", "#999999", [0, 0, 0], 1.156118)], [0.2582, 0.2823, 0]), new t([new x("", "#999999", [{ v: [-0.0452, 0.0302, 0] }, { c: [[-0.0393, 0.0243, 0], [-0.0223, 0.0089, 0]], v: [0.0023, 0.003, 0] }, { c: [[0.0023, 0.003, 0], [0.0369, 0.0036, 0]], v: [0.0392, 0.0104, 0] }, { t: 1, v: [0.0419, 0.0258, 0]}]), new x("#1B3281", "", [{ v: [-0.0919, 0.053, 0] }, { c: [[-0.0919, 0.053, 0], [-0.0973, 0.0654, 0]], v: [-0.0898, 0.0715, 0] }, { c: [[-0.0898, 0.0715, 0], [-0.0615, 0.0879, 0]], v: [-0.0482, 0.0573, 0] }, { c: [[-0.0482, 0.0573, 0], [-0.0388, 0.0262, 0]], v: [-0.0511, 0.0138, 0] }, { c: [[-0.0511, 0.0138, 0], [-0.0651, 0.0033, 0]], v: [-0.0919, 0.053, 0]}])], [new h("", "#999999", [0, 0, 0], 1.156118)], [0.2161, 0.2548, 0]), new t([new x("", "#999999", [{ v: [-0.0376, 5.0E-4, 0] }, { c: [[-0.0376, 5.0E-4, 0], [-0.0214, -0.001, 0]], v: [0.0021, 0.0039, 0] }, { c: [[0.0021, 0.0039, 0], [0.0217, 0.0163, 0]], v: [0.0325, 0.0329, 0] }, { t: 1, v: [0.0329, 0.0373, 0]}]), new x("#1B3281", "", [{ v: [-0.0376, 5.0E-4, 0] }, { c: [[-0.0376, 5.0E-4, 0], [-0.0459, -0.0297, 0]], v: [-0.0642, -0.0205, 0] }, { c: [[-0.0642, -0.0205, 0], [-0.0777, -0.0019, 0]], v: [-0.0752, 0.0394, 0] }, { c: [[-0.0752, 0.0394, 0], [-0.0732, 0.0508, 0]], v: [-0.0648, 0.0425, 0] }, { c: [[-0.0648, 0.0425, 0], [-0.0457, 0.0209, 0]], v: [-0.0376, 5.0E-4, 0]}])], [new h("", "#999999", [0, 0, 0], 1.156118)], [0.1831, 0.2177, 0]), new t([new x("", "#999999", [{ v: [0.0887, 0.032, 0] }, { c: [[0.0887, 0.032, 0], [0.0875, 0.0379, 0]], v: [0.0896, 0.0323, 0] }, { c: [[0.0896, 0.0323, 0], [0.0916, 0.0286, 0]], v: [0.0899, 0.0339, 0] }, { c: [[0.0899, 0.0339, 0], [0.0899, 0.0257, 0]], v: [0.0888, 0.0298, 0] }, { c: [[0.0888, 0.0298, 0], [0.0893, 0.0312, 0]], v: [0.0887, 0.032, 0]}]), new x("", "#999999", [{ v: [0.1569, -0.0701, 0] }, { c: [[0.1569, -0.0701, 0], [0.1579, -0.064, 0]], v: [0.1578, -0.0706, 0] }, { c: [[0.1578, -0.0706, 0], [0.1581, -0.0754, 0]], v: [0.1586, -0.0695, 0] }, { c: [[0.1586, -0.0695, 0], [0.1558, -0.0764, 0]], v: [0.1562, -0.0719, 0] }, { c: [[0.1562, -0.0719, 0], [0.1571, -0.0713, 0]], v: [0.1569, -0.0701, 0]}]), new x("", "#999999", [{ v: [0.1116, -0.0373, 0] }, { c: [[0.1116, -0.0373, 0], [0.1126, -0.0312, 0]], v: [0.1125, -0.0378, 0] }, { c: [[0.1125, -0.0378, 0], [0.1128, -0.0426, 0]], v: [0.1133, -0.0367, 0] }, { c: [[0.1133, -0.0367, 0], [0.1105, -0.0436, 0]], v: [0.1109, -0.0391, 0] }, { c: [[0.1109, -0.0391, 0], [0.1118, -0.0385, 0]], v: [0.1116, -0.0373, 0]}]), new x("", "#999999", [{ v: [0.0898, 0.0333, 0] }, { c: [[0.0898, 0.0333, 0], [0.1104, -0.0893, 0]], v: [0.2241, -0.1832, 0]}]), new x("", "#999999", [{ v: [-0.0546, 0.047, 0] }, { c: [[-0.0207, 0.0197, 0], [0.0707, -0.0519, 0]], v: [0.0862, -0.0441, 0] }, { c: [[0.0862, -0.0441, 0], [0.0931, -0.0427, 0]], v: [0.0914, -0.0232, 0]}]), new x("", "#999999", [{ v: [0.1564, -0.0709, 0] }, { t: 1, v: [0.1564, -0.0709, 0] }, { c: [[0.1564, -0.0709, 0], [0.1926, -0.0755, 0]], v: [0.2267, -0.0298, 0]}]), new x("", "#999999", [{ v: [0.1119, -0.0362, 0] }, { c: [[0.1119, -0.0362, 0], [0.1635, -0.1069, 0]], v: [0.2519, -0.0731, 0]}]), new x("", "#999999", [{ v: [0.0869, 0.078, 0] }, { c: [[0.0869, 0.078, 0], [0.089, -0.0363, 0]], v: [0.1063, -0.1194, 0]}]), new x("#00A33C", "", [{ v: [0.2236, -0.1834, 0] }, { c: [[0.2236, -0.1834, 0], [0.2292, -0.218, 0]], v: [0.2402, -0.2338, 0] }, { c: [[0.2402, -0.2338, 0], [0.2706, -0.2497, 0]], v: [0.2719, -0.2203, 0] }, { c: [[0.2719, -0.2203, 0], [0.2736, -0.1698, 0]], v: [0.2236, -0.1834, 0]}]), new x("#E63F35", "", [{ v: [0.2532, -0.0767, 0] }, { c: [[0.2532, -0.0767, 0], [0.2497, -0.0708, 0]], v: [0.2532, -0.0671, 0] }, { c: [[0.2532, -0.0671, 0], [0.2996, -0.0258, 0]], v: [0.3104, -0.044, 0] }, { c: [[0.3104, -0.044, 0], [0.3448, -0.1119, 0]], v: [0.3239, -0.1174, 0] }, { c: [[0.3239, -0.1174, 0], [0.2863, -0.1255, 0]], v: [0.2532, -0.0767, 0]}]), new x("#E63F35", "", [{ v: [0.2263, -0.0309, 0] }, { c: [[0.2263, -0.0309, 0], [0.2246, 0.0015, 0]], v: [0.2325, 0.025, 0] }, { c: [[0.2325, 0.025, 0], [0.2334, 0.0315, 0]], v: [0.2444, 0.033, 0] }, { c: [[0.2444, 0.033, 0], [0.2775, 0.0383, 0]], v: [0.2837, 0.017, 0] }, { c: [[0.2837, 0.017, 0], [0.2852, -0.0145, 0]], v: [0.2263, -0.0309, 0]}]), new x("#FFC46B", "", [{ v: [-0.0553, 0.0439, 0] }, { c: [[-0.0553, 0.0439, 0], [-0.0691, 0.003, 0]], v: [-0.1038, -0.014, 0] }, { c: [[-0.1038, -0.014, 0], [-0.115, -0.0234, 0]], v: [-0.12, -1.0E-4, 0] }, { c: [[-0.12, -1.0E-4, 0], [-0.1492, 0.1008, 0]], v: [-0.137, 0.1538, 0] }, { c: [[-0.137, 0.1538, 0], [-0.1345, 0.1798, 0]], v: [-0.1123, 0.1627, 0] }, { c: [[-0.1123, 0.1627, 0], [-0.0248, 0.1092, 0]], v: [-0.0553, 0.0439, 0] }, { v: [-0.1025, 0.0393, 0] }, { c: [[-0.1068, 0.0393, 0], [-0.1103, 0.0337, 0]], v: [-0.1103, 0.0267, 0] }, { c: [[-0.1103, 0.0198, 0], [-0.1068, 0.0142, 0]], v: [-0.1025, 0.0142, 0] }, { c: [[-0.0982, 0.0142, 0], [-0.0947, 0.0198, 0]], v: [-0.0947, 0.0267, 0] }, { c: [[-0.0947, 0.0337, 0], [-0.0982, 0.0393, 0]], v: [-0.1025, 0.0393, 0]}]), new x("#1B3281", "", [{ v: [0.1059, -0.1186, 0] }, { c: [[0.1059, -0.1186, 0], [0.0917, -0.1473, 0]], v: [0.0929, -0.1756, 0] }, { c: [[0.0929, -0.1756, 0], [0.0924, -0.1877, 0]], v: [0.1214, -0.2025, 0] }, { c: [[0.1214, -0.2025, 0], [0.147, -0.214, 0]], v: [0.1481, -0.203, 0] }, { c: [[0.1481, -0.203, 0], [0.154, -0.1376, 0]], v: [0.1059, -0.1186, 0]}])], [new h("", "#999999", [0, 0, 0], 1.156118), new h("", "#999999", [0.0918, -0.0223, 0], 1.156118)], [0.0962, 0.1363, 0]), new t([new x("", "#999999", [{ v: [-0.0656, 0.0276, 0] }, { c: [[-0.0542, 0.0211, 0], [-0.0319, 0.0098, 0]], v: [-0.001, 0.0025, 0] }, { c: [[-0.001, 0.0025, 0], [0.0364, 0.0082, 0]], v: [0.0764, 0.0496, 0] }, { t: 1, v: [0.0764, 0.069, 0]}]), new x("#E63F35", "", [{ v: [-0.1471, -0.0162, 0] }, { c: [[-0.1471, -0.0162, 0], [-0.1726, 0.0214, 0]], v: [-0.1827, 0.0962, 0] }, { c: [[-0.1827, 0.0962, 0], [-0.1854, 0.1202, 0]], v: [-0.1572, 0.1172, 0] }, { c: [[-0.1572, 0.1172, 0], [-0.109, 0.117, 0]], v: [-0.0647, 0.0268, 0] }, { c: [[-0.0647, 0.0268, 0], [-0.1136, -0.0649, 0]], v: [-0.1471, -0.0162, 0] }, { v: [-0.1253, 0.0328, 0] }, { c: [[-0.1323, 0.0328, 0], [-0.138, 0.0236, 0]], v: [-0.138, 0.0123, 0] }, { c: [[-0.138, 0.0011, 0], [-0.1323, -0.0081, 0]], v: [-0.1253, -0.0081, 0] }, { c: [[-0.1182, -0.0081, 0], [-0.1125, 0.0011, 0]], v: [-0.1125, 0.0123, 0] }, { c: [[-0.1125, 0.0236, 0], [-0.1182, 0.0328, 0]], v: [-0.1253, 0.0328, 0]}])], [new h("", "#999999", [0, 0, 0], 1.156118)], [0.0199, 0.0672, 0]), new t([new x("", "#999999", [{ v: [-0.2541, -0.026, 0] }, { c: [[-0.2323, -0.0395, 0], [-0.0621, -0.1384, 0]], v: [0.0056, 0.0157, 0]}]), new x("", "#999999", [{ v: [-0.0042, 0.0863, 0] }, { c: [[-0.0042, 0.0863, 0], [0.0046, -0.0635, 0]], v: [0.0501, -0.1449, 0]}]), new x("", "#999999", [{ v: [0.012, -0.025, 0] }, { c: [[0.012, -0.025, 0], [0.0304, -0.0815, 0]], v: [0.0626, -0.0946, 0]}]), new x("", "#999999", [{ v: [-0.1468, -0.0959, 0] }, { c: [[-0.0398, -0.0888, 0], [-6.0E-4, -0.0156, 0]], v: [-6.0E-4, -0.0156, 0] }, { t: 1, v: [-0.0045, -0.0063, 0]}]), new x("", "#999999", [{ v: [-0.035, -0.0551, 0] }, { t: 1, v: [-0.0383, -0.0437, 0]}]), new x("", "#999999", [{ v: [0.0036, 0.0147, 0] }, { c: [[0.0036, 0.0147, 0], [0.0046, 0.0221, 0]], v: [0.0048, 0.0142, 0] }, { c: [[0.0048, 0.0142, 0], [0.0055, 0.0086, 0]], v: [0.0058, 0.0156, 0] }, { c: [[0.0058, 0.0156, 0], [0.0023, 0.0072, 0]], v: [0.0027, 0.0125, 0] }, { c: [[0.0027, 0.0125, 0], [0.0039, 0.0133, 0]], v: [0.0036, 0.0147, 0]}]), new x("", "#999999", [{ v: [-0.0063, -0.004, 0] }, { c: [[-0.0063, -0.004, 0], [-0.0051, 0.0032, 0]], v: [-0.0051, -0.0047, 0] }, { c: [[-0.0051, -0.0047, 0], [-0.0045, -0.0103, 0]], v: [-0.004, -0.0033, 0] }, { c: [[-0.004, -0.0033, 0], [-0.0077, -0.0115, 0]], v: [-0.0073, -0.0062, 0] }, { c: [[-0.0073, -0.0062, 0], [-0.006, -0.0054, 0]], v: [-0.0063, -0.004, 0]}]), new x("", "#999999", [{ v: [-0.0391, -0.0434, 0] }, { c: [[-0.0391, -0.0434, 0], [-0.0379, -0.0361, 0]], v: [-0.0379, -0.044, 0] }, { c: [[-0.0379, -0.044, 0], [-0.0373, -0.0497, 0]], v: [-0.0368, -0.0427, 0] }, { c: [[-0.0368, -0.0427, 0], [-0.0405, -0.0509, 0]], v: [-0.04, -0.0456, 0] }, { c: [[-0.04, -0.0456, 0], [-0.0388, -0.0448, 0]], v: [-0.0391, -0.0434, 0]}]), new x("", "#999999", [{ v: [0.0116, -0.0272, 0] }, { c: [[0.0116, -0.0272, 0], [0.0123, -0.021, 0]], v: [0.0124, -0.0276, 0] }, { c: [[0.0124, -0.0276, 0], [0.013, -0.0324, 0]], v: [0.0132, -0.0265, 0] }, { c: [[0.0132, -0.0265, 0], [0.0107, -0.0336, 0]], v: [0.0109, -0.0291, 0] }, { c: [[0.0109, -0.0291, 0], [0.0118, -0.0283, 0]], v: [0.0116, -0.0272, 0]}]), new x("#1B3281", "", [{ v: [-0.4557, -0.0947, 0] }, { c: [[-0.4557, -0.0947, 0], [-0.4276, -0.1235, 0]], v: [-0.3567, -0.0715, 0] }, { c: [[-0.3567, -0.0715, 0], [-0.3049, -0.0211, 0]], v: [-0.254, -0.0271, 0] }, { c: [[-0.254, -0.0271, 0], [-0.2516, 0.0864, 0]], v: [-0.3516, 0.1967, 0] }, { c: [[-0.3516, 0.1967, 0], [-0.3669, 0.2165, 0]], v: [-0.3644, 0.1894, 0] }, { c: [[-0.3644, 0.1894, 0], [-0.3472, 0.098, 0]], v: [-0.3905, 0.0063, 0] }, { c: [[-0.3905, 0.0063, 0], [-0.4202, -0.0585, 0]], v: [-0.4557, -0.0947, 0]}]), new x("#1B3281", "", [{ v: [-0.1567, -0.1158, 0] }, { c: [[-0.1567, -0.1158, 0], [-0.1666, -0.1396, 0]], v: [-0.1738, -0.1287, 0] }, { c: [[-0.1738, -0.1287, 0], [-0.1885, -0.1018, 0]], v: [-0.1746, -0.0891, 0] }, { c: [[-0.1746, -0.0891, 0], [-0.1694, -0.0852, 0]], v: [-0.1473, -0.0922, 0] }, { c: [[-0.1473, -0.0922, 0], [-0.1423, -0.0927, 0]], v: [-0.1514, -0.1063, 0] }, { c: [[-0.1514, -0.1063, 0], [-0.1549, -0.1122, 0]], v: [-0.1567, -0.1158, 0]}]), new x("#E63F35", "", [{ v: [0.0476, -0.1516, 0] }, { c: [[0.0476, -0.1516, 0], [0.0464, -0.1404, 0]], v: [0.0545, -0.1432, 0] }, { c: [[0.0545, -0.1432, 0], [0.0809, -0.1506, 0]], v: [0.0903, -0.1738, 0] }, { c: [[0.0903, -0.1738, 0], [0.0915, -0.1864, 0]], v: [0.0703, -0.1938, 0] }, { c: [[0.0703, -0.1938, 0], [0.0563, -0.2006, 0]], v: [0.0476, -0.1516, 0]}]), new x("#FFC46B", "", [{ v: [0.0625, -0.094, 0] }, { c: [[0.0625, -0.094, 0], [0.0704, -0.1421, 0]], v: [0.0885, -0.1301, 0] }, { c: [[0.0885, -0.1301, 0], [0.1093, -0.1184, 0]], v: [0.113, -0.0823, 0] }, { c: [[0.113, -0.0823, 0], [0.1149, -0.0773, 0]], v: [0.1089, -0.0764, 0] }, { c: [[0.1089, -0.0764, 0], [0.0798, -0.0745, 0]], v: [0.0642, -0.0912, 0] }, { c: [[0.0642, -0.0912, 0], [0.0623, -0.0931, 0]], v: [0.0625, -0.094, 0]}])], [new h("", "#999999", [0, 0, 0], 1.156118)], [0.0242, -0.0213, 0])], new x("", "#D6D6D6", [{ v: [0.0243, -0.0231, 0] }, { t: 1, v: [0.0243, -0.4722, 0]}]), new h("#D6D6D6", "", [0.0243, -0.468, 0], 2.047072));
function C(a) { (a = document.getElementById(a)) && a.parentNode && a.parentNode.removeChild(a) }
function D(a) {
C("calder_hotspot"); C("calder"); C("calder_shadows");
E != e && (clearTimeout(E), E = e);
var b = document.getElementById("hplogo");
if (b) {
var c = document.createElement("img");
c.src = "https://www.google.com/logos/2011/calder11.png";
b.appendChild(c)
}
}
try {
if (!google.doodle) google.doodle = {};
var F = Math.PI / 20, G = 0, H = !1,
i = new g, I, p, J, L, ca, da, M = 0, N, ea = !1, O, P,
Q = !1, R = !1, S = e, fa = e, U, E = e, ga = e, ha = !0,
ia = function () {
for (var a = p, b = 0, c = 0; a != e; ) b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent;
return { x: b, y: c }
},
Y = function () {
var a = document.getElementById("hplogo");
if (!google.doodle.S && a) {
google.doodle.S = !0;
if (!document.getElementById("tsf")) {
a.style.height = "231px";
if (window.onresize) window.onresize(e)
}
R = Q = !1; S = e; a = B.a.length; B.B = B.w.e[1].v;
B.X = [B.a[a - 1].j[0] - B.B[0], B.a[a - 1].j[1] - B.B[1], B.a[a - 1].j[2] - B.B[2]];
for (b = a - 1; b > 0; b--)
B.a[b].W = [B.a[b - 1].j[0] - B.a[b].j[0], B.a[b - 1].j[1] - B.a[b].j[1], B.a[b - 1].j[2] - B.a[b].j[2]];
for (b = 0; b < a; b++)
for (var c = B.a[b], d = 0; d < c.s.length; d++) {
var f = B.a[b].s[d]; f.F = b; f.G = f.e[0].v[0] <= c.j[0]
}
B.a[5].A.y = Math.PI / 4; B.a[5].b.y = Math.PI / 4;
B.a[5].g.y = -1; B.a[0].g.y = 1;
B.a[1].g.y = -1; B.a[2].g.y = -1;
p = document.getElementById("calder");
ca = document.getElementById("calder_shadows");
J = document.getElementById("calder_hotspot");
L = ia(); da = ba();
I = new n(p.width * B.w.e[1].v[0], -p.height / 4);
"ontouchstart" in document.documentElement ? (p.addEventListener("touchstart", ja, !1), p.addEventListener("touchmove", ka, !1), p.addEventListener("touchend", la, !1)) : (p.addEventListener("mousedown", ma, !1), p.addEventListener("mousemove", na, !1), p.addEventListener("mouseup", V, !1), p.addEventListener("mouseout", oa, !1), p.addEventListener("mouseover", pa, !1), J.addEventListener("mouseover", qa, !1), J.addEventListener("mouseout", ra, !1));
window.addEventListener("resize", sa, !1);
window.addEventListener("deviceorientation", W, !1);
window.addEventListener("MozOrientation", W, !1);
X()
}
},
ta = function () {
p = document.getElementById("calder");
J = document.getElementById("calder_hotspot");
"ontouchstart" in document.documentElement && p ? (p.removeEventListener("touchstart", ja, !1), p.removeEventListener("touchmove", ka, !1), p.removeEventListener("touchend", la, !1)) : (p && (p.removeEventListener("mousedown", ma, !1), p.removeEventListener("mousemove", na, !1), p.removeEventListener("mouseup", V, !1), p.removeEventListener("mouseout", oa, !1), p.removeEventListener("mouseover", pa, !1)), J && (J.removeEventListener("mouseover", qa, !1), J.removeEventListener("mouseout", ra, !1))); window.removeEventListener("resize", sa, !1);
window.removeEventListener("deviceorientation", W, !1);
window.removeEventListener("MozOrientation", W, !1);
E != e && (clearTimeout(E), E = e);
google.doodle.S = !1
},
W = function (a) {
if (!a.gamma && a.x) a.gamma = -(a.x * (180 / Math.PI));
a.gamma && Math.abs(a.gamma) < 90 && (M = -F * (a.gamma / 90))
},
ua = function (a) {
var b = 0, c = 0;
if (a.pageX || a.pageY) b = a.pageX, c = a.pageY;
else if (a.clientX || a.clientY) b = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, c = a.clientY + document.body.scrollTop + document.documentElement.scrollTop;
a = a.target || a.srcElement;
b = b - L.x - a.width / 2;
c = c - L.y - a.height / 2;
return { x: b, y: c }
}, va = function (a) {
var b = a.targetTouches[0].clientX + document.body.scrollLeft + document.documentElement.scrollLeft, c = a.targetTouches[0].clientY + document.body.scrollTop + document.documentElement.scrollTop, a = a.target || a.srcElement, b = b - L.x - a.width / 2, c = c - L.y - a.height / 2;
return { x: b, y: c }
},
wa = function () {
if (U) {
var a = U, b = "default";
m(a.x, a.y) != e && (X(), b = "move");
p.style.cursor = b;
J.style.cursor = R && I.u == 2 ? "pointer" : "default"
}
},
xa = function (a) {
O = a; a = m(O.x, O.y);
if (a != e) {
P = a.F;
var b = B.a[P], c = Math.sin(b.b.y) > 0; ea = c && a.G || !c && !a.G;
N = !0; b.g.y = -b.k.y
}
},
ya = function (a) {
U = a; wa();
if (N) a = O.x - U.x < -2 ? -2 : O.x - U.x > 2 ? 2 : O.x - U.x, ea && (a = -a), B.a[P].g.y = a
},
ma = function (a) {
X();
a = a || window.event;
S = (new Date).getTime();
a && (a.preventDefault(), xa(ua(a)));
return !1
},
na = function (a) {
a = a || window.event; ya(ua(a));
return !1
},
V = function () {
X();
if (N) B.a[P].g.z = 0.5;
N = !1; S = (new Date).getTime();
return !1
},
pa = function () {
Q = !0; fa = (new Date).getTime();
return !1
},
oa = function () {
Q = !1; return V()
},
ja = function (a) {
X(); a.preventDefault();
if (!a.targetTouches || a.targetTouches.length != 1) return !1;
xa(va(a));
return !1
},
ka = function (a) {
a.preventDefault();
if (!a.targetTouches || a.targetTouches.length != 1) return !1;
ya(va(a)); return !1
},
la = function (a) {
X(); a.preventDefault();
return a.targetTouches && a.targetTouches.length > 0 ? !1 : N = !1
},
qa = function () {
X(); R = !0; return !1
},
ra = function () {
X(); return R = !1
},
sa = function () {
p && (L = ia())
},
X = function () {
ga = (new Date).getTime();
E == e && !H && (E = setTimeout(Z, 100))
},
Aa = function () {
E != e && (clearTimeout(E), E = e)
},
$ = function (a, b, c) {
var d = o(Math.abs(a.b.y - b.b.y), 2 * Math.PI); d > Math.PI && (d = 2 * Math.PI - d); d > c && (c = 0.5 * (d - c), d = a.b.y < b.b.y ? 1 : -1, a.b.y += d * c, b.b.y -= d * c)
},
Ba = function (a) {
var b = a.getContext("2d"); b.clearRect(0, 0, a.width, a.height);
b.save(); b.lineWidth = 1; b.translate(a.width / 2, a.height / 2);
return b
},
Z = function () {
try {
for (var a = (new Date).getTime(), b = B.a.length, c = 0; c < b; c++) {
var d = B.a[c];
d.i.y = d.b.y - d.A.y; d.i.z = d.b.z - d.A.z;
var f = 0, j = 0, k = d.b.z, j = 10 * (M - d.b.z), k = d.b.z - M; Math.abs(k) < 0.01 && (k = 0);
if (Math.abs(M) > F / 2) {
var l = c == 5 || c == 1 || c == 2 ? Math.PI : 0;
M < 0 && (l = Math.PI - l);
f = Math.cos(d.b.y) * Math.sin(l) - Math.cos(l) * Math.sin(d.b.y) < 0 ? -1 : 1
}
d.k.y = f + d.g.y - (c == 3 || c == 4 ? 0.04 : 0.004) * d.b.y - 0.3 * d.i.y; d.k.z = j + d.g.z - 20 * k - 5 * d.i.z; d.g.y = 0; d.g.z = 0
}
for (c = 0; c < b; c++) {
var d = B.a[c], Ca = { y: d.b.y, z: d.b.z };
d.b.y += d.i.y + d.k.y * 0.0064 < -0.05 ? -0.05 : d.i.y + d.k.y * 0.0064 > 0.05 ? 0.05 : d.i.y + d.k.y * 0.0064; d.b.z += d.i.z + d.k.z * 0.0064 < -0.01 ? -0.01 : d.i.z + d.k.z * 0.0064 > 0.01 ? 0.01 : d.i.z + d.k.z * 0.0064; d.A = Ca
}
for (c = 0; c < 2; c++) $(B.a[5], B.a[3], Math.PI / 2), $(B.a[4], B.a[3], Math.PI / 3), $(B.a[0], B.a[1], 7 * Math.PI / 8); B.a[b - 1].p = s(r(B.X, B.a[b - 1].b.z), B.B);
for (c = b - 2; c >= 0; c--) B.a[c].p = s(r(q(B.a[c + 1].W, B.a[c + 1].b.y), B.a[c + 1].b.z), B.a[c + 1].p); ha = Math.abs(o(B.a[b - 1].b.y, 2 * Math.PI)) < 0.1; wa();
var b = I, c = R, d = S, f = fa, A = (new Date).getTime(), j = Q || c;
switch (b.u) {
case 0: if (j) {
if (b.D != e && b.D > f) f = b.D; if (A - f < 3E3) break;
if (d != e && A - d < 3E3) break; b.u = 1; b.C = c
} break;
case 1: b.o += 0.2; if (b.o >= 1) b.Q = 0, b.o = 1, b.u = 2, b.R = A; break;
case 2: b.C = c; if (!j || !c && d != e && d >= b.R && A - d >= 1E3) b.u = 3; break;
case 3: if (b.o -= 0.2, b.o < 0.05) b.Q = 0, b.o = 0, b.u = 0, b.D = A
}
B.transform();
i.clear();
var T = Ba(p), K = Ba(ca); K.translate(-K.canvas.width * Math.sin(B.a[B.a.length - 1].b.z), 0); B.h(i, T, K, da); I.h(T); T.restore(); K.restore();
var za = (new Date).getTime();
ha && za - ga > 9E4 ? Aa() : (a = za - a, a < 100 ? (E = setTimeout(Z, 100 - a), G > 0 && G--) : (G++, G < 20 ? E = setTimeout(Z, 100) : (H = !0, Aa())))
}
catch (Da) { D(Da) }
};
google.x ? google.x("DOODLE", function () {
if (google.rein && google.dstr && !google.doodle.ca)
google.doodle.ca = !0, google.rein.push(Y), google.dstr.push(ta);
google.doodle.cpDestroy = ta;
google.doodle.cpInit = Y;
Y()
}) : Y()
}
catch (Ea) { D(Ea) };
}
)();
