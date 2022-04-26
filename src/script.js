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
  }

  render() {
    const { portfolio } = this.state;

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
                        <td><input type="number" name="shares_owned" value={shares_owned}/></td>
                        <td><input type="number" name="cost_per_share" value={cost_per_share}/></td>
                        <td><input type="number" name="Market_price" value={market_price}/></td>
                        <td>{market_value}</td>
                        <td>{unrealized_gain_loss}</td>
                        <td><button className="btn btn-danger btn-sm">remove</button></td>
                      </tr>  
                    )
                  })}
                </tbody>

              </table>
            </div>
          </div>
      </div>
    );
  }
}



ReactDOM.render(<Portfolio/>,
 document.getElementById('root'));