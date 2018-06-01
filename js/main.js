(function ($) {


    $.fn.preview = function () {

        for(var i=0; i<this.length;i++)
        {
            var eleFile = this[i];
            eleFile.addEventListener('change', function (e) {
                var eleFile = e.target;
                var preview = document.getElementById($(eleFile).data('preview'));
                $(preview).html('');
                for(var j=0;j<e.target.files.length;j++)
                {
                    var render = new FileReader();
                    render.addEventListener('load', function (e) {
                        var img = new Image();
                        img.addEventListener('load', function (e) {
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
                            var cWidth = $(preview).data('width');
                            var scale = e.target.width / cWidth;
                            var cHeight = Math.round(e.target.height / scale);
                            canvas.width = cWidth;
                            canvas.height = cHeight;
                            ctx.drawImage(e.target, 0, 0, cWidth, cHeight);

                            $(preview).append(canvas);
                            canvas.addEventListener('mousemove',canvasMouseMove);

                        })
                        img.src = e.target.result;

                    })
                    render.readAsDataURL(e.target.files[j]);
                }

            })

        }
    }

    function canvasMouseMove(e) {
        console.log(`${e.offsetX}, ${e.offsetY}`);
        console.log(`${e.target.offsetLeft}, ${e.target.offsetTop}`);
        var $picker = $('.picker').eq(0);
        console.log(`${$picker.width()},${$picker.height()}`)
        $picker.eq(0).css('left', (e.target.offsetLeft+e.offsetX-parseInt($picker.width()/2))+'px');
        $picker.eq(0).css('top', (e.target.offsetTop+e.offsetY-parseInt($picker.height()/2))+'px');

    }
})(jQuery)