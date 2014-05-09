/** @jsx React.DOM */

var Another = React.createClass({
  mixins: [ReactIntlMixin],
  getDefaultProps: function() {
    return {
      i18n: {
        SHORT: "{product} cost {price, number, usd} if ordered by {deadline, date, medium}"
      }
    };
  },
  render: function () {
    return <div>
      <h2>Instance #{this.props.foo}</h2>
      <h3>date helper with custom formatters:</h3>
      {this.intlDate(new Date(), "time-style")}

      <h3>number helper with custom formatters:</h3>
      {this.intlNumber(600, "eur")}

      <h3>message helper:</h3>
      {this.intlMessage(this.props.i18n.SHORT, {
        product: 'apples',
        price: 2000.15,
        deadline: new Date(),
        timeZone: 'UTC'
      })}
    </div>;
  }
});

var WrapIntlComponent = React.createClass({
  mixins: [ReactIntlMixin],
  render: function () {
    return <div>
        <h2>child component:</h2>
        <Another foo="4"></Another>
        {this.props.children}
    </div>;
  }
});

var Container = React.createClass({
  mixins: [ReactIntlMixin],
  getDefaultProps: function() {
    return {
      someTimestamp: 1390518044403,
      locales: ["en-US"],
      formats: {
        date: {
          "time-style": {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          }
        },
        number: {
          eur: { style: 'currency', currency: 'EUR' },
          usd: { style: 'currency', currency: 'USD' }
        }
      },
      messages: {
        LONG: "{product} cost {price, number, usd} (or {price, number, eur}) if ordered by {deadline, date, medium}"
      }
    };
  },
  render: function () {
    return <div>
        <h1>`intlDate` helper</h1>

        <h3>date helper:</h3>
        {this.intlDate(this.props.someTimestamp)}
        <h3>date helper with formatters:</h3>
        {this.intlDate(this.props.someTimestamp, { hour: 'numeric', minute: 'numeric' })}
        <h3>date helper with custom formatters:</h3>
        {this.intlDate(this.props.someTimestamp, "time-style")}

        <hr/>

        <h1>`intlNumber` helper</h1>

        <h3>number helper:</h3>
        {this.intlNumber(400)}
        <h3>number helper with formatters:</h3>
        {this.intlNumber(400, { style: 'percent' })}
        <h3>number helper with custom formatters:</h3>
        {this.intlNumber(400, "eur")}

        <hr/>

        <h1>`intlMessage` helper</h1>

        <h3>message helper:</h3>
        {this.intlMessage(this.props.messages.LONG, {
          product: 'oranges',
          price: 40000.004,
          deadline: this.props.someTimestamp,
          timeZone: 'UTC'
        })}

        <hr/>

        <div>
            <h2>child component with explicit values for `locales` and `formats`</h2>
            <Another foo="1" formats={this.props.formats} locales={this.props.locales}></Another>
        </div>

        <div>
            <h2>child component that inherits `intl` configuration thru the parents chain</h2>
            <Another foo="2"></Another>
        </div>

        <hr/>

        <WrapIntlComponent locales={["pt-BR"]}>
          <Another foo="3"></Another>
        </WrapIntlComponent>

    </div>;
  }
});

React.renderComponent(
  <Container locales={["en-US"]}/>,
  document.getElementById('example')
);