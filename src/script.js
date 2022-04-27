class Portfolio extends React.Component {
  constructor() {
    super();

    this.state = {
      portfolio: [
        {
          name: 'Famebook',
          shares_owned: 30,
          cost_per_share: 40,
          market_price: 24,
        },
        {
          name: "Amazoom",
          shares_owned: 43,
          cost_per_share: 32,
          market_price: 22,
        },
        {
          name: "Spamchat",
          shares_owned: 11,
          cost_per_share: 44,
          market_price: 51
        },
      ]
    };
      // Note: api JSON data often come in underscore_styled like above

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  removeStock(idx) {
    const portfolio = this.state.portfolio.slice(); //shallow copy
    portfolio.splice(idx, 1);

    this.setState({ portfolio });
  };

  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice();
    const {name, value} = event.target;

    portfolio[index][name] = value;
    this.setState({ portfolio });
  };
  
  render() {
    const { portfolio } = this.state;

    const portfolio_Market_Value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    
    const stocks_Cost_Of_Purchase = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);

    const unrealized_Gain_Loss = portfolio_Market_Value - stocks_Cost_Of_Purchase;

    return(
      <div className="container">
        <h1 className="text-center my-4">Stock Portfolio</h1>
          <div className="row">
            <div className="col-12">
              <table className="table table-responsive">
                
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Shares Owned</th>
                    <th scope="col">Cost per share ($)</th>
                    <th scope="col">Market Price ($)</th>
                    <th scope="col">Market Value ($)</th>
                    <th scope="col">Unrealized Gain/Loss ($)</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                
                <tbody>

                  {portfolio.map((stock, idx) => {
                    const { name, shares_owned, cost_per_share, market_price } = stock;

                    const market_value = shares_owned * market_price;
                    const unrealized_gain_loss = market_value - shares_owned * cost_per_share;
                    
                    return(
                      <tr key={idx}>
                        <td>{name}</td>
                        <td><input type="number" name="shares_owned" value={shares_owned} onChange={e => this.handleChange(e, idx)}/></td>
                        <td><input type="number" name="cost_per_share" value={cost_per_share} onChange={e => this.handleChange(e, idx)}/></td>
                        <td><input type="number" name="market_price" value={market_price} onChange={e => this.handleChange(e, idx)}/></td>
                        <td>{market_value}</td>
                        <td>{unrealized_gain_loss}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={() => this.removeStock(idx)}>remove</button></td>
                      </tr>  
                    )
                  })}
                </tbody>
              </table>
            </div>
                  <div className="col-12 col-md-6">
                    <h4 className="mb-3">Portfolio: $ {portfolio_Market_Value}</h4>
                  </div>
                  <div className="col-12 col-md-6">
                    <h4 className="mb-3">Unrealized Gain/Loss: $ {unrealized_Gain_Loss}</h4>
                  </div>
          </div>
        </div>
    );
  }
}



ReactDOM.render(<Portfolio/>,
 document.getElementById('root'));