/**
 * TravelPlanner constructor
 *
 * It receives a list of destinations with their dependencies and creates an optimal route
 * @param {Object} options
 * @property {Map} options.destinations Map<destination, dependency>
 */
function TravelPlanner({ destinations }) {
  this._destinations = new Map(destinations);
  this._optimalRoute = new Set();
}

/**
 * Get an optimally ordered list of destinations
 * @returns Array of destinations
 */
TravelPlanner.prototype.calculateOptimalRoute = function() {
  this._destinations.forEach((_, destination) => {
    this._sortDestination(destination);
  });

  return Array.from(this._optimalRoute);
};

/**
 * Inserts the current destination after all of its dependencies into optimalRoute
 * @param {String} destination Character marking the desctination
 */
TravelPlanner.prototype._sortDestination = function(destination, dependencyChain = []) {
  const dependency = this._destinations.get(destination);
  const dependencyAlreadyInRoute = this._optimalRoute.has(dependency);

  if (dependency && !dependencyAlreadyInRoute) {

    const dependencyInDestinations = this._destinations.has(dependency);
    if(!dependencyInDestinations) {
      throw new Error("Non-existing destination in dependencies");
    }

    if (dependencyChain.includes(destination)) {
      throw new Error("Circle in dependencies");
    }

    dependencyChain.push(destination);
    this._sortDestination(dependency, dependencyChain);

  }

  this._optimalRoute.add(destination);
  this._destinations.delete(destination);
};

module.exports = TravelPlanner;
