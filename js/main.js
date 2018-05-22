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
                            var cWidth = 400;
                            var scale = e.target.width / cWidth;
                            var cHeight = Math.round(e.target.height / scale);
                            canvas.height = cHeight;
                            ctx.drawImage(e.target, 0, 0, cWidth, cHeight);

                            $(preview).append(canvas);

                        })
                        img.src = e.target.result;

                    })
                    render.readAsDataURL(e.target.files[j]);
                }

            })

        }
    }
})(jQuery)