// TODO => Reactify this

$(document).ready(function() {
  $("#tickerForm").fadeIn(500);
  getTickerInput(socket, symbols)
});

function newTradeViewGraph(symbols) {
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
}
