var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portfolio = function (_React$Component) {
  _inherits(Portfolio, _React$Component);

  function Portfolio() {
    _classCallCheck(this, Portfolio);

    var _this = _possibleConstructorReturn(this, (Portfolio.__proto__ || Object.getPrototypeOf(Portfolio)).call(this));

    _this.state = {

      portfolio: [{
        name: 'Famebook',
        shares_owned: 30,
        cost_per_share: 40,
        market_price: 24
      }, {
        name: "Amazoom",
        shares_owned: 43,
        cost_per_share: 32,
        market_price: 22
      }, {
        name: "Spamchat",
        shares_owned: 11,
        cost_per_share: 44,
        market_price: 51
      }],

      form: {
        name: "",
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }

    };
    // Note: api JSON data often come in underscore_styled like above

    _this.removeStock = _this.removeStock.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);

    _this.formHandleChange = _this.formHandleChange.bind(_this);
    _this.addStock = _this.addStock.bind(_this);

    return _this;
  }

  _createClass(Portfolio, [{
    key: "removeStock",
    value: function removeStock(idx) {
      var portfolio = this.state.portfolio.slice(); //shallow copy
      portfolio.splice(idx, 1);

      this.setState({ portfolio: portfolio });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event, index) {
      var portfolio = this.state.portfolio.slice();
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;


      portfolio[index][name] = value;
      this.setState({ portfolio: portfolio });
    }
  }, {
    key: "formHandleChange",
    value: function formHandleChange(event) {
      var _event$target2 = event.target,
          name = _event$target2.name,
          value = _event$target2.value;
      var form = this.state.form;


      form[name] = value;
      this.setState({ form: form });
    }
  }, {
    key: "addStock",
    value: function addStock(event) {
      event.preventDefault();
      var portfolio = this.state.portfolio.slice();

      portfolio.push(this.state.form);

      this.setState({
        portfolio: portfolio,
        form: {
          name: "",
          shares_owned: 0,
          cost_per_share: 0,
          market_price: 0
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          portfolio = _state.portfolio,
          form = _state.form;


      var portfolio_Market_Value = portfolio.reduce(function (sum, stock) {
        return stock.shares_owned * stock.market_price + sum;
      }, 0);

      var stocks_Cost_Of_Purchase = portfolio.reduce(function (sum, stock) {
        return stock.shares_owned * stock.cost_per_share + sum;
      }, 0);

      var unrealized_Gain_Loss = portfolio_Market_Value - stocks_Cost_Of_Purchase;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h1",
          { className: "text-center my-4" },
          "Stock Portfolio"
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement(
              "table",
              { className: "table table-responsive" },
              React.createElement(
                "thead",
                null,
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    { scope: "col" },
                    "Name"
                  ),
                  React.createElement(
                    "th",
                    { scope: "col" },
                    "Shares Owned"
                  ),
                  React.createElement(
                    "th",
                    { scope: "col" },
                    "Cost per share ($)"
                  ),
                  React.createElement(
                    "th",
                    { scope: "col" },
                    "Market Price ($)"
                  ),
                  React.createElement(
                    "th",
                    { scope: "col" },
                    "Market Value ($)"
                  ),
                  React.createElement(
                    "th",
                    { scope: "col" },
                    "Unrealized Gain/Loss ($)"
                  ),
                  React.createElement("th", { scope: "col" })
                )
              ),
              React.createElement(
                "tbody",
                null,
                portfolio.map(function (stock, idx) {
                  var name = stock.name,
                      shares_owned = stock.shares_owned,
                      cost_per_share = stock.cost_per_share,
                      market_price = stock.market_price;


                  var market_value = shares_owned * market_price;
                  var unrealized_gain_loss = market_value - shares_owned * cost_per_share;

                  return React.createElement(
                    "tr",
                    { key: idx },
                    React.createElement(
                      "td",
                      null,
                      name
                    ),
                    React.createElement(
                      "td",
                      null,
                      React.createElement("input", { type: "number", name: "shares_owned", value: shares_owned, onChange: function onChange(e) {
                          return _this2.handleChange(e, idx);
                        } })
                    ),
                    React.createElement(
                      "td",
                      null,
                      React.createElement("input", { type: "number", name: "cost_per_share", value: cost_per_share, onChange: function onChange(e) {
                          return _this2.handleChange(e, idx);
                        } })
                    ),
                    React.createElement(
                      "td",
                      null,
                      React.createElement("input", { type: "number", name: "market_price", value: market_price, onChange: function onChange(e) {
                          return _this2.handleChange(e, idx);
                        } })
                    ),
                    React.createElement(
                      "td",
                      { style: { color: "white" } },
                      market_value
                    ),
                    React.createElement(
                      "td",
                      { style: { color: "white" } },
                      unrealized_gain_loss
                    ),
                    React.createElement(
                      "td",
                      null,
                      React.createElement(
                        "button",
                        { className: "btn btn-danger btn-sm", onClick: function onClick() {
                            return _this2.removeStock(idx);
                          } },
                        "remove"
                      )
                    )
                  );
                })
              )
            )
          ),
          React.createElement(
            "form",
            { className: "col-12 mt-2 mb-4", onSubmit: this.addStock },
            React.createElement("input", { className: "mx-2", type: "text", name: "name", value: form.name, placeholder: "NAME", onChange: this.formHandleChange }),
            React.createElement("input", { className: "mx-2", type: "number", name: "shares_owned", value: form.shares_owned, placeholder: "SHARES", onChange: this.formHandleChange }),
            React.createElement("input", { className: "mx-2", type: "number", name: "cost_per_share", value: form.cost_per_share, placeholder: "COST", onChange: this.formHandleChange }),
            React.createElement("input", { className: "mx-2", type: "number", name: "market_price", value: form.market_price, placeholder: "PRICE", onChange: this.formHandleChange }),
            React.createElement(
              "button",
              { className: "btn btn-primary btn-sm" },
              "ADD"
            )
          ),
          React.createElement(
            "div",
            { className: "portfolio-GainLoss col-12 col-md-6" },
            React.createElement(
              "h4",
              { className: "mb-3" },
              "Portfolio: $ ",
              portfolio_Market_Value
            )
          ),
          React.createElement(
            "div",
            { className: "portfolio-GainLoss col-12 col-md-6" },
            React.createElement(
              "h4",
              { className: "mb-3" },
              "Unrealized Gain/Loss: $ ",
              unrealized_Gain_Loss
            )
          )
        )
      );
    }
  }]);

  return Portfolio;
}(React.Component);

var Footer = function Footer() {
  return React.createElement(
    "div",
    { className: "py-2 my-4 text-center", style: { color: 'white' } },
    React.createElement(
      "span",
      null,
      "ReactJs practice by:"
    ),
    React.createElement(
      "p",
      null,
      React.createElement(
        "a",
        { href: "https://confident-murdock-8e5bba.netlify.app/", target: "_blank", rel: "noopener noreferrer" },
        "Francis Artemio Landia"
      ),
      React.createElement("br", null),
      "2022"
    )
  );
};

ReactDOM.render(React.createElement(Portfolio, null), document.getElementById('root'));

ReactDOM.render(React.createElement(Footer, null), document.getElementById('footer'));