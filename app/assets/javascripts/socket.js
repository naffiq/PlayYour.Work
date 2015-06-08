angular.module('odoru')
.factory('socket', [
	'$rootScope',
	'$q',
	function($rootScope, $q) {
		var o = {};

		o.getSocket = function() {
			if (!$rootScope.socket) {
				$rootScope.socket = io('http://localhost:8080');
			};
			return $rootScope.socket;
		}

		o.emit = function(title, obj) {
			o.getSocket().emit(title, obj);
		}

		o.changeWspaceRoom = function(wspace_id) {
			o.changeRoom('wspace', wspace_id);
		};

		o.changeProjectRoom = function(project_id) {
			o.changeRoom('project', project_id);
		};

		o.changeRoom = function(type, room) {
			o.getSocket().emit('change-' + type + '-room', type + '-' + room);
		};


		o.leaveRoom = function(room) {
			o.getSocketHandler().connect(function(socket) {
				socket.leave(room);
			});
		};

		o.broadcastRoom = function(room, title, msg) {
			o.getSocket().emit(title, {room: room, title: title, msg: msg});
		}

		return o;
	}
]);