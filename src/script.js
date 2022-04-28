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
        }
      ],

      form: {
          name: "",
          shares_owned: 0,
          cost_per_share: 0,
          market_price: 0
      }

    };
      // Note: api JSON data often come in underscore_styled like above

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.formHandleChange = this.formHandleChange.bind(this);
    this.addStock = this.addStock.bind(this);

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

  formHandleChange(event) {
    const {name, value} = event.target;
    const { form } = this.state;

    form[name] = value;
    this.setState({ form });
  };

  addStock(event) {
    event.preventDefault();
    const portfolio = this.state.portfolio.slice();

    portfolio.push(this.state.form);

    this.setState({
      portfolio,
      form: {
          name: "",
          shares_owned: 0,
          cost_per_share: 0,
          market_price: 0
      }
    });
  };
  
  render() {
    const {portfolio, form} = this.state;

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
                        <td style={{color: "white"}}>{market_value}</td>
                        <td style={{color: "white"}}>{unrealized_gain_loss}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={() => this.removeStock(idx)}>remove</button></td>
                      </tr>  
                    )
                  })}
               </tbody>
              </table>
            </div>
              <form className="col-12 mt-2 mb-4" onSubmit={this.addStock}>
                  <input className="mx-2" type="text" name="name" value={form.name} placeholder="NAME" onChange={this.formHandleChange} />
                  <input className="mx-2" type="number" name="shares_owned" value={form.shares_owned} placeholder="SHARES" onChange={this.formHandleChange} />
                  <input className="mx-2" type="number" name="cost_per_share" value={form.cost_per_share} placeholder="COST" onChange={this.formHandleChange} />
                  <input className="mx-2" type="number" name="market_price" value={form.market_price} placeholder="PRICE" onChange={this.formHandleChange} />
                  <button className="btn btn-primary btn-sm">ADD</button>
              </form>
                  <div className="portfolio-GainLoss col-12 col-md-6">
                    <h4 className="mb-3">Portfolio: $ {portfolio_Market_Value}</h4>
                  </div>
                  <div className="portfolio-GainLoss col-12 col-md-6">
                    <h4 className="mb-3">Unrealized Gain/Loss: $ {unrealized_Gain_Loss}</h4>
                  </div>
        </div>
      </div>
    );
  }
}

const Footer = () => {
  return(
      <div className="py-2 my-4 text-center" style={{color: 'white'}}>
           <span>ReactJs practice by:</span>
           <p><a href="https://confident-murdock-8e5bba.netlify.app/" target="_blank" rel="noopener noreferrer">Francis Artemio Landia</a><br />2022</p>
      </div>
  );
};

ReactDOM.render(<Portfolio/>,
 document.getElementById('root'));

ReactDOM.render(<Footer/>,
 document.getElementById('footer'));