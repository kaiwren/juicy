jQuery(
        function($) {
          var Console = {
            isConsolePresent: function() {
              return window.console ? true : false;
            }
          }

          var Logging = {
            log: function(text) {
              var now = new Date();
              var timestamp = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();
              if ($.isConsolePresent()) {
                // Use this if you have a console (FF, Safari/Webkit)
                console.log(level + ' | ' + timestamp + ' | ' + text);
              }
              else {
                // Use this if you don't have a oonsole. You need that div in place.
                $('#debug').append('<div class="entry">' + level + ' | ' + timestamp + ' | ' + '<pre>' + text + '</pre></div>');
              }
            },

            inspect: function(object) {
              var inspectString = '';
              for (var property in this) {
                inspectString += property + ' : ' + object[property] + ' | ';
              }
              return inspectString;
            }
          }

          var Dom = {
            newEl : function(tag, attributes) {
              var element = document.createElement(tag);
              attributes = attributes || {};
              // Safari doesn't like us using 'class' as a name, so we use css instead
              // ie {class: 'bodyContent'} causes Safari to barf
              attributes['class'] = attributes['css'];
              delete attributes.css;
              $(element).attr(attributes);
              return $(element);
            }
          }

          var Events = {
            createEvent: function(object, name) {
              object.fn = {};
              object[name + 'Listener'] = function(fn) {
                return $(object.fn).bind(name, fn)
              };
              object[name] = function(eventData) {
                eventData = eventData || {};
                eventData['source'] = object;
                $(object.fn).trigger(name, eventData);
              }
            }
          }

          var JsCoreExtensions = {
            returning: function(value, fn) {
              fn(value);
              return value;
            },

            setupInheritanceChain: function(subClass, baseClass) {
              // Derived from http://www.kevlindev.com/tutorials/javascript/inheritance/index.htm
              // To invoke the baseClass constructor do
              // BaseClass.baseConstructor.call(this, first, last);
              // in the subClass' constructor

              function inheritance() {
              }

              inheritance.prototype = baseClass.prototype;

              subClass.prototype = $.extend(new inheritance(), subClass.prototype);
              subClass.prototype.constructor = subClass;
              subClass.baseConstructor = baseClass;
              subClass.superClass = baseClass.prototype;
            }
          }

          $.extend(Console);
          $.extend(Logging);
          $.extend(Dom);
          $.extend(JsCoreExtensions);
          $.extend(Events);

          Function.prototype.extendz = function(baseClass) {
            $.setupInheritanceChain(this, baseClass);
          }
        }
    )