/**
 * TravelPlanner constructor
 *
 * It receives a list of destinations with their dependencies and creates an optimal route
 * @param {Object} options
 * @property {Map} options.destinations Map<destination, dependency>
 */
function TravelPlanner({ destinations }) {
  this._destinations = destinations;
  this._optimalRoute = new Set();
}

/**
 * Get an optimally ordered list of destinations
 * @returns Array of destinations
 */
TravelPlanner.prototype.calculateOptimalRoute = function() {

};

/**
 * Inserts the current destination after all of its dependencies into optimalRoute
 * @param {String} destination Character marking the desctination
 */
TravelPlanner.prototype._sortDestination = function(destination) {

};

module.exports = TravelPlanner;
