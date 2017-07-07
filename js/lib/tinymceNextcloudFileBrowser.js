var NextCloudFileBrowserDialogue = function (field_name, url, type, win) {
    var fileListUrl ='../files/ajax/list.php?dir=/';
    function listDir(dir) {
        $.get(fileListUrl, function (dirIndex) {
            console.log('Dir index of' + dir +' ', dirIndex);
        });
    }

    var browser = $('<div id="mceNextcloudFileBrowser" />');
    browser.css('zIndex', 99999);

    var btn = $('<div class="btn btn-success">Click me</div>');
    btn.click(function () {
        win.document.getElementById(field_name).value = 'my browser value';
        browser.dialog('destroy');
    });
    btn.appendTo(browser);
    browser.dialog({
        title: 'Select a file from your Nextcloud'
    });
    //
};
