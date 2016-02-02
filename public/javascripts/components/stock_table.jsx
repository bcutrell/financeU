var React = require('react');

// Declare some Vars
var socket = io.connect();
var symbols = []

StockTable = React.createClass({

  getInitialState: function(){
    return {
      tableHeaders: ["Ask","Beta","52 Week High","52 Week Low","Name","EPS"],
      rowIDs: ["askBox","betaBox","fiftyTwoWeekHighBox","fiftyTwoWeekLowBox","nameBox","epsBox"]
    }
  },

  render: function() {
    var headers = this.state.tableHeaders.map(function(header,index) {
      return <th key={index}>{header}</th>
    });

    var rows = this.state.rowIDs.map(function(rowID,index) {
      return <td id={rowID} key={index}></td>
    });

    return (
<table className="table">
  <thead>
    <tr> { headers } </tr>
  </thead>
  <tbody>
    <tr> { rows } </tr>
  </tbody>
</table>
    )
  }
});


TickerForm = React.createClass({

  handleSubmit: function() {
    event.preventDefault();
    var quote = $('#tickerInput').val();
    socket.emit('tickerInput', quote);
    symbols.unshift([quote.toUpperCase(), quote]);
    this.newTradeViewGraph(symbols);
  },
  
  newTradeViewGraph: function(symbols) {
    new TradingView.MediumWidget({
      "container_id": "bigGraph",
      "symbols": symbols,
      "gridLineColor": "#E9E9EA",
      "fontColor": "#83888D",
      "underLineColor": "#F0F0F0",
      "timeAxisBackgroundColor": "#E9EDF2",
      "trendLineColor": "#FF7965",
      "width": '100%',
      "height": 350
    });
  },

  render: function() {
    return (
<div className='text-center'>
  <form id="tickerForm" className="form-inline" onSubmit={this.handleSubmit}>
    <div className="form-group">
      <input id="tickerInput" type="text" placeholder="TICKER" className="form-control"/>
    </div>
    <div className="text-center">
      <button id="submit" type="submit" className="btn btn-default">Submit</button>
    </div>
  </form>
  <div style={{ display: 'none' }} className="bad-ticker-box">
    <div className="row">
      <div role="alert" className="alert alert-danger min-alert-height">
        <div id="badTickerBox" className="text-center"></div>
      </div>
    </div>
  </div>
</div>
  )
  }
})


QuotesTable = React.createClass({

  render: function() {
    return (
<div>
  <div className="row">
    <div className="col-md-12">
      <h3 className="text-center">Quotes</h3>
    </div>
  </div>
  <div className="row">
    <div className="col-md-4 col-md-offset-2">
      <div className="well text-center">
        <h5>Bid</h5>
        <p id="quoteBid"></p>
        <p id="quoteBidSize"></p>
      </div>
    </div>
    <div className="col-md-4">
      <div className="well text-center">
        <h5>Ask</h5>
        <p id="quoteAsk"></p>
        <p id="quoteAskSize"></p>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="well well-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody id="stream-quote-table"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    )
  }
})

TradesTable = React.createClass({
  
  render: function() {
    return (
<div>
<div className="row">
  <div className="col-md-12">
    <h3 className="text-center">Trades</h3>
  </div>
</div>
<div className="row">
  <div className="col-md-12">
    <div className="well well-lg">
      <table className="table trade-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>VWAP</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody id="stream-trade-table"></tbody>
      </table>
    </div>
  </div>
</div>
</div>
    )
  }

})

module.exports = { 
  StockTable: StockTable, 
  TickerForm: TickerForm,
  QuotesTable: QuotesTable,
  TradesTable: TradesTable
}
