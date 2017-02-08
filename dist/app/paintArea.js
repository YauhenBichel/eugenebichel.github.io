(function(angular) {
    "use strict";

    angular.module('MonkeyTricksApp')
        .controller('PaintAreaController', ['$scope' ,function($scope) {

        }])
        .directive('paintArea', function() {

            var canvas = null;
            var isPainting = false;
            var mousePosition = null;
            var canvasContext = null;
            var canvasAngularWrapper = null;

            function link(scope, element, attrs) {

                canvas = element[0].childNodes[0];

                canvasContext = canvas.getContext('2d');

                canvasContext.lineWidth = 4;
                canvasContext.lineJoin = 'round';
                canvasContext.lineCap = 'round';
                canvasContext.strokeStyle = 'darkblue';

                mousePosition = {
                    x: 0,
                    y: 0
                };

                canvasAngularWrapper = angular.element(canvas);

                canvasAngularWrapper.on('mousemove', onMousePosCalculate.bind(this));
                canvasAngularWrapper.on('mousedown', onStartStopPaint.bind(this));
            }

            function onStartStopPaint() {
                if(isPainting === true) {
                    isPainting = false;
                    canvasAngularWrapper.off('mousemove', onPaint);
                    return;
                }

                isPainting = true;
                canvasContext.beginPath();
                canvasContext.moveTo(mousePosition.x, mousePosition.y);

                canvasAngularWrapper.on('mousemove', onPaint.bind(this));
            }

            function onMousePosCalculate(e) {
                var coordCanvas = canvas.getBoundingClientRect();

                console.log("onMousePosCalculate: canvas left " + coordCanvas.left);
                console.log("onMousePosCalculate: canvas top " + coordCanvas.top);

                mousePosition.x = e.pageX - (coordCanvas.left + canvas.offsetLeft);
                mousePosition.y = e.pageY - (coordCanvas.top + canvas.offsetTop);

                console.log("onMousePosCalculate: mouse left " + mousePosition.x);
                console.log("onMousePosCalculate: mouse top " + mousePosition.y);
            }

            function onPaint() {
                canvasContext.lineTo(mousePosition.x, mousePosition.y);
                canvasContext.stroke();
            }

            return {
                restrict: 'E',
                link: link,
                templateUrl: './dist/app/paintArea.tpl.html'
            };
        });

})(window.angular);
