function showModalDialog() {
    var dialog = $('#postModalDialog');
    dialog.modal('show');
    $("body.modal-open").removeAttr("style");
}
function hideModalDialog(callback) {
    var dialog = $('#postModalDialog');
    dialog.modal('hide');
    dialog.on('hidden.bs.modal', function () {
        callback();
    })
}