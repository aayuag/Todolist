# dont

make svg donuts with js.

# methods

## `dont.segment(cx, cy, ri, ro, ds, de[, offset])`

draws a donut segment, returns an svg path;

* `cx` - <float> center x
* `cy` - <float> center y
* `ri` - <float> inner radius from center (the hole)
* `ro` - <float> outer radius from center (the edge)
* `ds` - <float> segment starts at degrees
* `de` - <float> segment ends at degrees
* `offset` - <float> degrees offset; shift the start of the donut circle

## `dont.rad(degrees[, offset])`

converts degrees to radians, with an offset of degrees

## `dont.area(ri, ro, ra)`

calculates and returns the radius from center for a segment **area** to be in proportion to the area of the whole segment. 
if you want a comparable areas instead of comparable radii. the area of the hole is taken into account.

(send a pull request if you get what i mean and can explain it more eloquent).

* `ri` - <float> inner radius from center (the hole)
* `ro` - <float> outer radius from center (the edge)
* `ra` - <float> ratio of area in relation to total segment area

## `dont.draw(data [, options])`

*to be implemented*

