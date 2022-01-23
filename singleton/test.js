class SingletonTester {
  static isSingleton(generator) {
    //most linters complain unless a constructor class is capitalized
    const Generator = generator;

    const[instance1, instance2] = [new Generator(), new Generator()];
    return instance1 === instance2;
  }
}
