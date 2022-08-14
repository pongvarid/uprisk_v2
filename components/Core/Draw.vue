<template>
  <div  >
    <canvas ref="sign" id="myCanvas" width="400" height="200" @mousedown="beginDrawing" @mousemove="keepDrawing" @mouseup="stopDrawing" />

  </div>
</template>

<script>
import {Core} from "~/vuexes/core";

export default {
  data(){
    return ({
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
    })
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }


    },
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
        let data = document.getElementById("myCanvas");
        let img = data.toDataURL("image/jpeg;base64")
        this.$emit('getSign',img)
      }
    }
  },
  mounted() {
    var c = document.getElementById("myCanvas");
    this.canvas = c.getContext('2d');
  }
}
</script>
<style  >
#myCanvas {
  border: 1px solid grey;
}
</style>
