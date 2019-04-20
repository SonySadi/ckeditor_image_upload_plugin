CKEDITOR.plugins.add("imageupload", {
  init: function(editor) {
    //Plugin logic goes here.
    /* editor.addCommand("imageupload", {
      exec: function(editor) {
        editor.insertHtml("it's a image");
      }
    }); */
    CKEDITOR.dialog.add(
      "imageuploadDialog",
      this.path + "dialogs/imageupload.js"
    );
    editor.addCommand(
      "imageupload",
      new CKEDITOR.dialogCommand("imageuploadDialog")
    );
    editor.ui.addButton("imageupload", {
      label: "Photo\\Video",
      command: "imageupload",
      toolbar: "insert",
      icon: "plugins/imageupload/icons/imageupload.png"
    });
  }
});
