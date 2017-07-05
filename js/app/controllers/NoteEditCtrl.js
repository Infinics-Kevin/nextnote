/**
 * Nextcloud - NextNotes
 *
 * @copyright Copyright (c) 2016, Sander Brand (brantje@gmail.com)
 * @copyright Copyright (c) 2016, Marcos Zuriaga Miguel (wolfi@wolfi.es)
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name passmanApp.controller:MainCtrl
	 * @description
	 * # MainCtrl
	 * Controller of the passmanApp
	 */
	angular.module('NextNotesApp')
		.controller('NoteEditCtrl', ['$scope', '$rootScope', 'NoteService', '$routeParams', '$location', '$timeout', function ($scope, $rootScope, NoteService, $routeParams, $location, $timeout) {
			$scope.noteShadowCopy = {
				title: '',
				content: ''
			};



			var noteId = ($routeParams.noteId) ? $routeParams.noteId : null;
			if (noteId) {
				NoteService.getNoteById(noteId).then(function (note) {
					$scope.note = note;
					$scope.noteShadowCopy = angular.copy(note);
				});
			} else {
				$scope.note = NoteService.newNote();
				$scope.noteShadowCopy = angular.copy($scope.note);
			}

			var o = $('#ownnote').offset();
			var h = $(window).height() - o.top;
			$scope.tinymceOptions = {
				menubar: false,
				plugins: [
					"advlist autolink lists link charmap print preview anchor",
					"searchreplace visualblocks code fullscreen noneditable",
					"insertdatetime media table contextmenu bdesk_photo autoresize"
				],
				extended_valid_elements: "form[name|id|action|method|enctype|accept-charset|onsubmit|onreset|target],input[id|name|type|value|size|maxlength|checked|accept|src|width|height|disabled|readonly|tabindex|accesskey|onfocus|onblur|onchange|onselect|onclick|onkeyup|onkeydown|required|style],textarea[id|name|rows|cols|maxlength|disabled|readonly|tabindex|accesskey|onfocus|onblur|onchange|onselect|onclick|onkeyup|onkeydown|required|style],option[name|id|value|selected|style],select[id|name|type|value|size|maxlength|checked|width|height|disabled|readonly|tabindex|accesskey|onfocus|onblur|onchange|onselect|onclick|multiple|style]",
				toolbar: "insertfile undo redo | styleselect | bold italic strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link bdesk_photo",
				allow_html_data_urls: true,
				allow_script_urls: true,
				paste_data_images: true,
				width: '100%',
				height: h - 140,
				autoresize_min_height: h - 140,
				autoresize_max_height: h - 140
			};

			$scope.autoSaved = false;
			$scope.saveNote = function (autoSave) {
				$scope.noteShadowCopy.noteTitle = angular.copy($scope.noteShadowCopy.title)
				if(!$scope.noteShadowCopy.title){
					return;
				}
				$scope.noteShadowCopy.$save().then(function (result) {
					console.log(autoSave, result)
					$rootScope.notes[result.id] = result;
					if(autoSave){
						$scope.autoSaved = true;
						$timeout(function () {
							$scope.autoSaved = false;
						}, 2500);
					}
				})
				// if(!$scope.noteShadowCopy.id) {
				// 	NoteService.save($scope.noteShadowCopy);
				// } else {
				// 	NoteService.update({id: $scope.noteShadowCopy.id}, $scope.noteShadowCopy);
				// }
			};

			var autoSaveTimer;
			var initialSave = true;
			$scope.$watch('[noteShadowCopy.title, noteShadowCopy.content]', function () {
				if(autoSaveTimer){
					$timeout.cancel(autoSaveTimer);
				}
				if($scope.noteShadowCopy.title && $scope.noteShadowCopy.title != "") {
					if(initialSave){
						initialSave = false;
						return;
					}
					autoSaveTimer = $timeout(function () {
						$scope.saveNote(true);
					}, 1500);
				}
			});

			$scope.cancelEdit = function () {
				$location.path('/');
			}



		}]);
}());