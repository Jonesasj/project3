public class StubUtil {
    private StubUtil(){}

    public static CalloutStub getInstance() {
        return new CalloutStub();
    }

     public static Object createMock(Type typeToMock) {
        // Invoke the stub API and pass it our mock provider to create a
        // mock class of typeToMock.
        return Test.createStub(typeToMock, StubUtil.getInstance());
    }
}
