angular.module('templates-main', ['views/list.html', 'views/note/edit.html']);

angular.module('views/list.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('views/list.html',
    '<div id="ownnote"><div id="controls"><div id="new" class="button indent">New</div><div id="newfile" class="newfile indent"><form id="createform" class="note-title-form"><input type="text" class="newfileinput" id="newfilename" value="note title" style="color: rgb(160, 160, 160)"><select id="groupname"><option value="">Not grouped</option><option value="_new">New group</option></select><input type="text" class="newgroupinput" id="newgroupname" placeholder="group title"> <button id="create" class="button">Create</button><div id="cancel" class="button">Cancel</div></form></div></div><div class="listingBlank"></div><table class="listingSort"><thead><tr><th class="notename filesort notesort"><div class="pointer sorttitle" id="sortname">Name</div><div class="sortarrow sortup"></div></th><th class="actions"></th><th class="info modified notesort"><span class="pointer" id="sortmod">Modified</span></th></tr></thead><tbody><tr class="listing" ng-repeat="note in notes"><td title="{{ note.title }}" p="undefined" class="file pointer" ng-click="editNote(note)">{{ note.title }}</td><td class="actions"><div id="note-{{ note.id }}-delete" class="buttons delete delete-note pointer" ng-click="deleteNote(note)"></div><div id="note-{{ note.id }}-edit" class="buttons edit edit-note pointer" ng-click="editNote(note)"></div></td><td class="info"><div class="modified" title="{{ note.mtime | date:dateFormatLong}}">{{ note.mtime | timeAgo}}</div></td></tr></tbody></table></div>');
}]);

angular.module('views/note/edit.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('views/note/edit.html',
    '<div id="ownnote"><div id="controls"><div id="newfile" class="indent"><form id="editform" class="note-title-form">Name: <input type="text" class="fileinput" ng-model="noteShadowCopy.title"> &nbsp;&nbsp; Group:<select id="groupname" ng-model="noteShadowCopy.grouping"><option value="">Not grouped</option><option value="_new">New group</option></select><input type="text" placeholder="group title"><div id="save" class="button">Save</div><div id="canceledit" class="button" ng-click="cancelEdit()">Cancel</div></form></div></div><div class="listingBlank"></div><textarea ui-tinymce="tinymceOptions" ng-model="noteShadowCopy.content">\n' +
    '\n' +
    '	</textarea></div>');
}]);
