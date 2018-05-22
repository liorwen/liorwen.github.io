(function ($) {
    $.fn.compress = function () {
        var canvas = this[0];
        var ctx = canvas.getContext('2d');
        var cWidth = this.data('width');

        var eleFile = document.getElementById("eleFile");
        eleFile.addEventListener('change', function (e) {
            var render = new FileReader();
            render.addEventListener('load', function (e) {
                var img = new Image();
                img.addEventListener('load', function (e) {
                    canvas.width = cWidth;
                    var scale = e.target.width / cWidth;
                    var gHeight = Math.round(e.target.height / scale);
                    canvas.height = gHeight;
                    ctx.drawImage(e.target, 0, 0, cWidth, gHeight);
                })
                img.src = e.target.result;

            })
            render.readAsDataURL(e.target.files[0]);
        })
        return this;
    }



})(jQuery)