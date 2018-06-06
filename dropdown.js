(function ($) {	/*global HUI,window,jQuery, $*/


    'use strict';

    var DROPDOWN_HTML = '<div class="mod_dropdown_inputbox">' +
        '<input type="text" class="mod_form_txt mod_dropdown_input" id="#{0}" data-placeholder="#{1}" readonly="true"/>' +
        //'<input type="hidden" class="mod_dropdown_value" name="#{0}"/>' +//TODO
        '<i class="mod_dropdown_arw"></i>' +
        '<ul class="mod_dropdown_options clearfix"></ul>' +
        '<select class="mod_dropdown_select" name="#{0}"></select>' + //TODO
        '</div>';

    HUI.Widget.extend('Dropdown', {
        options: {
            //knockout: true, //todo
            /**
             * @name maxView
             * @desc 用来设置dropdown初始最多显示多少个item。
             * @type bool
             * @default false
             */
            maxView: 12,
            /**
             * @name width
             * @desc 用来设置dropdown的宽度。
             * @type number
             * @default false
             */
            width: false
        },

        _create: function () {
            var self = this,
                ele = self.element,
                name = ele.attr('data-name');

            ele.html(HUI.util.format(DROPDOWN_HTML, name, ele.attr('data-placeholder')));
            self.trees = new Function('return ' + ele.attr('data-options'))(); //learn 获取字符串值
            self.opts = {};
            self.opts.name = ele.attr('data-name');
            self.opts.$optionsBox = ele.find('.mod_dropdown_options');
            self.opts.$selectBox = ele.find('.mod_dropdown_select'); //TODO
            //self.opts.$valueInput = ele.find('.mod_dropdown_value');//TODO
            self.opts.$textInput = ele.find('.mod_dropdown_input');
            self.opts.defaultValue = ele.attr('data-value');

            self._createOptionItems();
        },

        _createOptionItems: function () {
            var self = this,
                trees = self.trees,
                name = self.opts.name,
                textInput = self.opts.$textInput,
                optionsBox = self.opts.$optionsBox,
                selectBox = self.opts.$selectBox,
                o = self.options,
                text, value,
                liLen = o.maxView,
                width = o.width;

            if (trees.length > liLen) {
                optionsBox.css({
                    'height': textInput.height() * liLen + 'px',
                    'overflow-y': 'scroll'
                });
            }

            for (var i = 0; i < trees.length; i++) { //最好用变量记下tree.length
                text = trees[i].text;
                value = trees[i].value;
                $('<li title="' + text + '">' + text + '</li>')
                    .data('value', value)
                    .appendTo(optionsBox);
                $('<option value="' + value + '">' + text + '</option>').appendTo(selectBox); //TODO
            }

            self._setWidth(width ? width : selectBox.width());


            o.knockout && optionsBox.attr('data-bind', 'value:' + name);

            self._initBehavior();
        },

        _setWidth: function (width) { //this method need tobe modified
            var self = this,
                textInput = self.opts.$textInput,
                optionsBox = self.opts.$optionsBox;

            optionsBox.css({
                'min-width': width + 10 + 'px'
            });
            textInput.css({
                'width': width - 14 + 'px',
                'padding-right': 20 + 'px'
            });
        },

        _getText: function (value, index) {
            var self = this,
                trees = self.trees;

            for (var i = 0; i < trees.length; i++) {
                if (trees[i].value != value) {
                    continue;
                }
                else {
                    return !index ? trees[i].text : i;
                }
            }
        },

        _initBehavior: function () {
            var self = this,
                selectBox = self.opts.$selectBox,
                optionsBox = self.opts.$optionsBox,
                li = optionsBox.find('li'),
                textInput = self.opts.$textInput,
                defaultValue = self.opts.defaultValue;

            self._setPlaceholder();
            li.hover(function () {
                $(this).addClass('mod_dropdown_hover');
            }, function () {
                $(this).removeClass('mod_dropdown_hover');
            });

            textInput.on('click', function (e) {
                e.stopPropagation();
                self._inputSelectFun.call(self); //learn
            });

            optionsBox.on('click', 'li', function () {
                var index = $(this).index();
                
                selectBox[0].selectedIndex = parseInt(index);
                selectBox.trigger('change');
            });

            selectBox.on('change', function () {
                var text = $(this).find('option:selected').text(),
                    val = $(this).val();

                self.change.call(self, {
                    text: text,
                    value: val
                });
            });

            if(defaultValue != undefined || self.options.Value!= undefined){
                self.Value(defaultValue);
                //selectBox.trigger('change');
            }
        },

        _inputSelectFun: function () { //learn
            var self = this,
                ele = self.element,
                inputSelectFun = function () {
                    self._inputSelectFun();
                },
                hideAllOptions = function () {
                    self._hideAllOptions();
                };

            if (ele.hasClass('mod_dropdown_box_expand')) { //优化加进options expandClassName
                self._hideAllOptions();
                $('document,body').off('click', inputSelectFun);
            }
            else {
                self._hideAllOptions();
                ele.addClass('mod_dropdown_box_expand');
                $('document,body').off('click', inputSelectFun);
                $('document,body').on('click', hideAllOptions);
            }

        },

        _hideAllOptions: function () {
            var dropBox = $('.mod_dropdown_box'); //优化 加进options
            dropBox.removeClass('mod_dropdown_box_expand');
        },

        _setPlaceholder: function () {
            var self = this,
                ele = self.element,
                name = self.opts.name,
                textInput = self.opts.$textInput,
                placeholder = textInput.attr('data-placeholder'),
                dropdownBox = ele.find('.mod_dropdown_inputbox');

            if (placeholder) {
                var data = self.options.knockout ? 'data-bind="visible:' + name + '()==\'\'"' : '';
                var html = '<span class="mod_dropdown_placeholder"' + data + '>' + placeholder + '</span>';
                dropdownBox.append(html);
                self.opts.$placeholder = ele.find('.mod_dropdown_placeholder');
            }
        },

        _hidePlaceholder: function () {
            var self = this;
            self.opts.$placeholder.hide();
        },

        change: function (ele) {
            var self = this,
                value = ele.value,
                text = ele.text;

            self.value = value;
            self.text = text;
            self._setValue(value);
            self._invoke('change', null, {
                value: value,
                text: text
            });
        },

        _getValue: function () {
            //var val = this.opts.$valueInput.val();

            //return val;
        },

        _setValue: function (value) {
            var self = this,
                //valueInput = self.opts.$valueInput,
                textInput = self.opts.$textInput,
                selectBox = self.opts.$selectBox,
                optionsBox = self.opts.$optionsBox,
                placeholder = self.opts.$placeholder;

            //valueInput.val(value);
            textInput.val(self._getText(value));
            var index = self._getText(value, true);
            selectBox[0].selectedIndex = index;
            optionsBox.find('li').eq(index).addClass('cur').siblings().removeClass('cur');
            placeholder && self._hidePlaceholder();
        },

        /**
        获取或设置当前下拉框的值.
        @param {number} - 设置当前下拉框的值
        @returns {number} 获取当前下拉框的值（如果没有参数传入的话）.
        */
        Value: function (value) {
            var self = this;
            if (value === undefined) {
                return self._getValue();
            }
            self._setValue(value);
        }
    });
}(jQuery));