const TravelPlanner = require("./travelPlanner.js");

describe("TravelPlanner contructor", () => {
  it("initiates local variables", () => {
    const destinations = new Map();

    const travelPlanner = new TravelPlanner({ destinations });

    expect(travelPlanner._destinations).toEqual(destinations);
    expect(travelPlanner._optimalRoute).toBeInstanceOf(Set);
  });
});

describe("TravelPlanner.prototype.calculateOptimalRoute()", () => {
  it("returns an array", () => {
    const destinations = new Map();

    const travelPlanner = new TravelPlanner({ destinations });
    const returnValue = travelPlanner.calculateOptimalRoute();

    expect(Array.isArray(returnValue)).toEqual(true);
  });

  it("returns an array with the same length as the destinations", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", null);
    destinations.set("c", null);

    const travelPlanner = new TravelPlanner({ destinations });
    const returnValue = travelPlanner.calculateOptimalRoute();

    expect(returnValue.length).toEqual(destinations.size);
  });

  it("returns an array containing all of the keys defined in destinations Map", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", null);
    destinations.set("c", null);

    const travelPlanner = new TravelPlanner({ destinations });
    const returnValue = travelPlanner.calculateOptimalRoute();

    const keysOfDestinations = Array.from(destinations.keys());

    expect(returnValue).toEqual(expect.arrayContaining(keysOfDestinations));
  });

  it("returns correct route when there are no dependencies", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", null);
    destinations.set("c", null);

    const travelPlanner = new TravelPlanner({ destinations });
    const returnValue = travelPlanner.calculateOptimalRoute();

    const expectedRoute = ["a", "b", "c"];

    expect(returnValue).toEqual(expectedRoute);
  });

  it("returns correct route when there are dependencies", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", "c");
    destinations.set("c", "e");
    destinations.set("d", "f");
    destinations.set("e", null);
    destinations.set("f", null);

    const travelPlanner = new TravelPlanner({ destinations });
    const returnValue = travelPlanner.calculateOptimalRoute();

    const expectedRoute = ["a", "e", "c", "b", "f", "d"];

    expect(returnValue).toEqual(expectedRoute);
  });

  it("returns correct route when there are mutual dependencies", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", "e");
    destinations.set("c", "e");
    destinations.set("d", "e");
    destinations.set("e", null);
    destinations.set("f", null);

    const travelPlanner = new TravelPlanner({ destinations });
    const returnValue = travelPlanner.calculateOptimalRoute();

    const expectedRoute = ["a", "e", "b", "c", "d", "f"];

    expect(returnValue).toEqual(expectedRoute);
  });

  it("throws Error when there is a circle in the dependencies", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", "c");
    destinations.set("c", "d");
    destinations.set("d", "b");

    const travelPlanner = new TravelPlanner({ destinations });

    const caller = () => {
      travelPlanner.calculateOptimalRoute();
    };

    expect(caller).toThrow("Circle in dependencies");
  });

  it("throws Error when there is a dependency for a non-existing destination", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", "c");
    destinations.set("c", "e");
    destinations.set("d", null);

    const travelPlanner = new TravelPlanner({ destinations });

    const caller = () => {
      travelPlanner.calculateOptimalRoute();
    };

    expect(caller).toThrow("Non-existing destination in dependencies");
  });

  it("throws Error when a destination appears multiple times", () => {
    const destinations = new Map();
    destinations.set("a", null);
    destinations.set("b", "c");
    destinations.set("c", "d");
    destinations.set("d", "b");

    const travelPlanner = new TravelPlanner({ destinations });

    const caller = () => {
      travelPlanner.calculateOptimalRoute();
    };

    expect(caller).toThrow("Destination duplication");
  });
});
