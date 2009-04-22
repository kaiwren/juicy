
jQuery(
        function ($) {
          $.fn.juicyTags = function (opt) {
            function init() {
              var view = new View({containerElement: $(options.containerSelector)});
              var model = new Model(view);
              var controller = new Controller(model, view);
            }

            var options = $.extend({
              containerSelector: '#juicy-tags',
              getUrl: null,
              postUrl: null,
              height: "10",
              defaultText: "Start to type..."
            }, opt);
            
            var view = null;
            var model = null;
            var controller = null;

            return this;
          }
        }
        );