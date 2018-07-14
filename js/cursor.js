/**
 * カーソル追従クラス
 */
var Cursor = function(options) {
    // デフォルトのオプション
    this.options = {
        cursorId: 'cursor-fixed', // 描画するカーソルのid
        defaultPointerDelete: true, // ブラウザのデフォルトポインターを消すかどうか
    };

    // オプションを継承
    if (options) {
        Object.keys(options).forEach(function(key) {
            this.options[key] = options[key];
        }.bind(this));
    }

    // カーソルのelement
    this.elCursor = document.getElementById(this.options.cursorId);
    this.elPointer = document.getElementById(this.options.cursorId + '__pointer');
    if (!this.elCursor || !this.elPointer) {
        // domがなければ作る
        this.elCursor = document.createElement('div');
        this.elCursor.id = this.options.cursorId;
        this.elCursor.className = this.options.cursorId;

        this.elPointer = document.createElement('div');
        this.elPointer.id = this.options.cursorId + '__pointer';
        this.elPointer.className = this.options.cursorId + '__pointer';

        this.elCursor.appendChild(this.elPointer);
        document.body.appendChild(this.elCursor);
    }

    // デフォルトのポインターを消す
    if (this.options.defaultPointerDelete) {
        var style = '* { cursor: none !important; }';
        var styleTag = document.createElement('style');
        styleTag.type = 'text/css';

        if (style.styleSheet) {
            styleTag.styleSheet.cssText = style;
        } else {
            styleTag.appendChild(document.createTextNode(style));
        }
        document.head.appendChild(styleTag);
    }

    // 初期化
    this.init();
};


/**
 * 初期化
 */
Cursor.prototype.init = function() {
    // カーソルのスタイルを設定
    this.elCursor.style.position = 'fixed';
    this.elCursor.style.top = '0';
    this.elCursor.style.right = '0';
    this.elCursor.style.bottom = '0';
    this.elCursor.style.left = '0';
    this.elCursor.style.width = '0';
    this.elCursor.style.height = '0';
    this.elCursor.style.zIndex = '99999999';
    this.elCursor.style.pointerEvents = 'none';

    // カーソルの追従開始
    window.addEventListener('mousemove', function(event) {
        var e = event || widow.event; // IE対応
        // カーソルの幅、高さの半分分位置をずらす
        this.setCursorPosition(e.clientX - (this.elPointer.clientWidth / 2), e.clientY - (this.elPointer.clientHeight / 2));
    }.bind(this));
};


/**
 * canvasのサイズをセット
 */
Cursor.prototype.setCursorPosition = function(x, y) {
    this.elCursor.style.transform = "matrix(1, 0, 0, 1," + x + ", " + y + ")";
};