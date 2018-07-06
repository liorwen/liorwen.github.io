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
                            canvas.id = ''
                            var ctx = canvas.getContext('2d');
                            var cWidth = $(preview).data('width');
                            var scale = e.target.width / cWidth;
                            var cHeight = Math.round(e.target.height / scale);
                            canvas.width = cWidth;
                            canvas.height = cHeight;
                            ctx.drawImage(e.target, 0, 0, cWidth, cHeight);

                            $(preview).append(canvas);

                            // canvas.addEventListener('cmousemove',canvasMouseMove);
                            // canvas.addEventListener('mousemove',function (e) {
                                // console.log(e.target.offsetLeft,e.target.offsetTop);
                                // var cEvent = new CustomEvent('cmousemove',{'detail':{mouseX:e.target.offsetLeft+e.offsetX,
                                //                                                     mouseY:e.target.offsetTop+e.offsetY}});
                                // canvas.dispatchEvent(cEvent);
                            // });
                            // var picker = document.getElementsByClassName('picker')[0];
                            // picker.addEventListener('mousemove',function (e) {

                                // var cEvent = new CustomEvent('cmousemove',{'detail':{mouseX:e.target.offsetLeft+e.offsetX,
                                //     mouseY:e.target.offsetTop+e.offsetY}});
                                // canvas.dispatchEvent(cEvent);
                            // })

                        })
                        img.src = e.target.result;

                    })
                    render.readAsDataURL(e.target.files[j]);
                }

            })

        }
    }


    function canvasMouseMove(e) {
        console.log(`${e.detail.mouseX},${e.detail.mouseX}`);
        // console.log(`${e.offsetX}, ${e.offsetY}`);
        // console.log(`${e.target.offsetLeft}, ${e.target.offsetTop}`);
        var $picker = $('.picker').eq(0);
        // console.log(`${$picker.width()},${$picker.height()}`)
        $picker.eq(0).css('left', (e.detail.mouseX-parseInt($picker.width()/2))+'px');
        $picker.eq(0).css('top', (e.detail.mouseY-parseInt($picker.height()/2))+'px');

    }
    $(function () {
        $('#btn-fb').on('click',function (e) {
            FB.getLoginStatus(function(response) {
                if(response.status === 'connected')
                {
                    FB.login(function(response) {

                        if (response.authResponse) {
                            console.log('Welcome!  Fetching your information.... ');
                            FB.api('/me', function(response) {
                                console.log(response);
                                console.log('Good to see you, ' + response.name + '.');
                            });
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {scope: 'email,user_photos,user_posts'});
                }
            });
            return false;
        })
    })
})(jQuery)