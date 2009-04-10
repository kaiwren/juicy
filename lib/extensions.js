/*
Copyright 2009 Sidu Ponnappa

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License
is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

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
                console.log(timestamp + ' | ' + text);
              }
              else {
                // Use this if you don't have a console. You need that div in place.
                $('#debug').append('<div class="entry">' + timestamp + ' | ' + '<pre>' + text + '</pre></div>');
              }
            },

            inspect: function(object) {
              var inspects = new Array();
              for (var property in object) {
                if (object[property] != undefined) {
                  inspects.push(property + ' : ' + object[property]);
                }
              }
              return inspects.join(' | ');
            },

            inspectAll: function(object) {
              var inspects = new Array();
              for (var property in object) {
                inspects.push(property + ' : ' + object[property]);
              }
              return inspects.join(' | ');
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
              // BaseClass.baseConstructor.call(this, paramX , paramY);
              // in the subClass' constructor

              function inheritance() {
              }

              inheritance.prototype = baseClass.prototype;

              subClass.prototype = $.extend(new inheritance(), subClass.prototype);
              subClass.prototype.constructor = subClass;
              subClass.baseConstructor = baseClass;
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
          Object.baseConstructor = Function;
          Function.baseConstructor = null;
          Function.prototype.baseConstructor = null;
        }
      )