const Checkout = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${accedi})`,
          backgroundSize: "cover",
        }}
      >
        <div className={`${style.loginContainerOptions}`}>
          <Container className="w-100 h-100 p-5">
            <Row className="d-flex justify-content-center align-items-center text-light h-100 w-100 p-5">
              <Col
                className={`d-flex flex-column justify-content-center align-items-center h-100 ${style.registerOptions}`}
              >
                {!showAuthModal && (
                  <>
                    <h3>Sei già registrato?</h3>
                    <p
                      onClick={() => {
                        setShowAuthModal(true);
                      }}
                      className="text-warning"
                      style={{ cursor: "pointer" }}
                    >
                      Accedi ora!
                    </p>
                  </>
                )}
                {showAuthModal && (
                  <>
                    <h3 className="mb-3">Accedi</h3>
                    <input
                      value={username}
                      className={`mb-5 mb-md-3 ${style.inputOptions}`}
                      type="text"
                      placeholder="username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <input
                      value={password}
                      className={`mb-5 mb-md-3 ${style.inputOptions}`}
                      type="password"
                      placeholder="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <MyButton
                      text="Sign Up"
                      onClick={() => {
                        dispatch(fetchToken(user));
                        setUsername("");
                        setPassword("");
                      }}
                      style={{
                        backgroundColor: `${COLORS.brandGold}`,
                        color: `${COLORS.brandBlack}`,
                        marginTop: "12px",
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* {showAuthModal && (
    <Modal
      onClose={() => setShowAuthModal(false)}
      title="Accedi a Grand Bistrot"
      subtitle="login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    >
      <MyButton
        text="Sign Up"
        onClick={() => {
          dispatch(fetchToken(user));
          setUsername("");
          setPassword("");
        }}
        style={{
          backgroundColor: `${COLORS.brandGold}`,
          color: `${COLORS.brandBlack}`,
        }}
      />
    </Modal>
  )} */}
    </>
  );
};

export default Checkout;
