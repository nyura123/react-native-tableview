'use strict';

var React = require('react-native');
var { AppRegistry, Text, Dimensions,View } = React;
var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;
var Cell = TableView.Cell;
var {Actions, Router, Route, Schema, Animations} = require('react-native-router-flux');
var NavigationBar = require('react-native-navbar');
var Firebase = require('firebase');

class NavBar extends React.Component {
    render(){
        return <NavigationBar style={{backgroundColor: '#0db0d9'}}
                              titleColor='white'
                              buttonsColor='white'
                              statusBar='lightContent' {...this.props} />
    }
}
class Example1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sectionLabel: 'Section', cellLabel: 'Cell 1', cells:[<Cell><Text>Cell 3</Text></Cell>]};
    }

    componentDidMount(){
        setTimeout(()=>this.setState({sectionLabel: 'Section #1', cellLabel: 'Cell #1', cells:[<Cell><Text>Cell #3</Text></Cell>,<Cell><Text>Cell #4</Text></Cell>]}));
    }
    render() {
        return (
            <TableView style={{flex:1}} onPress={(event) => alert(JSON.stringify(event))}>
                <Section label={this.state.sectionLabel}>
                    <Cell style={{backgroundColor:'gray'}} value="">
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{height:200, backgroundColor:'red'}}><Text>{this.state.cellLabel}</Text></Cell>
                    <Cell style={{height:100}}><Text>Cell 4</Text></Cell>
                    <Cell><Text>Cell 5</Text></Cell>
                </Section>
                <Section label="section 2">
                    <Cell style={{backgroundColor:'gray'}} value="1">
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1.1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1.1</Text>
                    </Cell>
                    <Cell style={{height:200, backgroundColor:'red'}}><Text>Cell 1.2</Text></Cell>
                    <Cell><Text>Cell 3</Text></Cell>
                    <Cell style={{height:100}}><Text>Cell 4</Text></Cell>
                    <Cell><Text>Cell 5</Text></Cell>
                </Section>
                <Section label="section 3">
                    {this.state.cells}
                </Section>
            </TableView>
        );
    }
}

class Example2 extends React.Component {
    // list spanish provinces and add 'All states' item at the beginning
    render() {
        var country = "ES";
        return (
            <TableView selectedValue="" style={{flex:1}} json="states" filter={`country=='${country}'`}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Item value="">All states</Item>
            </TableView>
        );
    }
}

class Example3 extends React.Component {
    render(){
        return (
            <TableView style={{flex:1}}
                       allowsToggle={true}
                       allowsMultipleSelection={true}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Section label="Section 1" arrow={true}>
                    <Item value="1" detail="Detail1" >Item 1</Item>
                    <Item value="2">Item 2</Item>
                    <Item>Item 3</Item>
                    <Item>Item 4</Item>
                    <Item>Item 5</Item>
                    <Item>Item 6</Item>
                    <Item>Item 7</Item>
                    <Item>Item 8</Item>
                    <Item>Item 9</Item>
                    <Item>Item 10</Item>
                    <Item>Item 11</Item>
                    <Item>Item 12</Item>
                    <Item>Item 13</Item>
                    <Item>Item 14</Item>
                    <Item>Item 15</Item>
                    <Item>Item 16</Item>
                </Section>
                <Section label="Section 2" arrow={false}>
                    <Item selected={true}>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
                <Section label="Section 3" arrow={false}>
                    <Item>Item 1</Item>
                    <Item selected={true}>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
            </TableView>
        );
    }
}

//Similar to example 2 but use "TableViewExampleCell" reusable cells
class ReusableCellExample1 extends React.Component {
    // list spanish provinces and add 'All states' item at the beginning
    render() {
        var country = "ES";
        return (
            <TableView selectedValue="" reactModuleForCell="TableViewExampleCell" style={{flex:1}} json="states" filter={`country=='${country}'`}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Item value="">All states</Item>
            </TableView>
        );
    }
}

class ReusableCellExample2 extends React.Component {
    render(){
        var numAdditionaItems = 1000;
        var moreItems = [];
        for (var i = 0; i < numAdditionaItems; ++i) {
            moreItems.push(i);
        }
        return (
            <TableView reactModuleForCell="TableViewExampleCell" style={{flex:1}}
                       allowsToggle={true}
                       allowsMultipleSelection={true}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Section label="Section 1" arrow={true}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                    <Item backgroundColor="gray" height={44}>Item 4</Item>
                    <Item>Item 5</Item>
                    <Item>Item 6</Item>
                    <Item>Item 7</Item>
                    <Item>Item 8</Item>
                    <Item>Item 9</Item>
                    <Item backgroundColor="red" height={200}>Item 10</Item>
                    <Item>Item 11</Item>
                    <Item>Item 12</Item>
                    <Item>Item 13</Item>
                    <Item>Item 14</Item>
                    <Item>Item 15</Item>
                    <Item>Item 16</Item>
                </Section>
                <Section label="Section 2" arrow={false}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
                <Section label="Section 3" arrow={true}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
                <Section label={"large section - "+numAdditionaItems+" items"}>
                    {moreItems.map((i)=><Item key={i+1}>{i+1}</Item>)}
                </Section>
            </TableView>
        );
    }
}

class FirebaseExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:null};
        this.reactCellModule = "DinosaurCellExample";
        this.firebaseLocation = "https://dinosaur-facts.firebaseio.com/dinosaurs";
        this.propPrefix = "dinosaur";
    }
    componentDidMount() {
        var dinData = null;
        var self = this;
        this.ref = new Firebase(this.firebaseLocation);
        this.ref.on('value', function(snapshot) {
            self.setState({data:snapshot.val()});
        });
    }
    componentWillUnmount() {
        this.ref.off();
    }
    renderItem(itemData, key, index) {
        //TODO passing itemData={itemData} doesn't seem to work... so pass all data props with a prefix to make sure they don't clash
        //with other <Item> props
        var item = {};
        Object.keys(itemData||{}).forEach(k => {
           item[this.propPrefix+k] = itemData[k];
        });
        item[this.propPrefix+"key"] = key;

        //concat all key-val's into one string
        var label = Object.keys(itemData).map((k)=>k+":"+itemData[k]).join(",");

        return (<Item {...item} height={140} backgroundColor={index%2==0?"white":"grey"} key={key} label={label}></Item>);
    }
    render() {
        var data = this.state.data;
        if (!data) {
            return <Text style={{height:580}}>NO DATA</Text>
        }

        var self = this;
        var items = Object.keys(data).map((key,index)=>self.renderItem(data[key], key, index));

        return (
            <View style={{flex:1}}>
                <Text value="">All Items</Text>
                <TableView style={{flex:1}} reactModuleForCell={this.reactCellModule}
                           tableViewCellStyle={TableView.Consts.CellStyle.Default}
                           onPress={(event) => alert(JSON.stringify(event))}>
                    <Section arrow={true}>
                        {items}
                    </Section>
                </TableView>
            </View>
        );
    }
}

class Edit extends React.Component {
    constructor(props){
        super(props);
        this.state = {editing: false};
    }
    render(){
        var self = this;
        return (
            <View style={{flex:1}}>
                <NavBar {...this.props} nextTitle={this.state.editing ? "Done" : "Edit"}
                                        onNext={()=>self.setState({editing: !self.state.editing})}/>
                <TableView style={{flex:1}} editing={this.state.editing}
                           onPress={(event) => alert(JSON.stringify(event))} onChange={(event) => alert("CHANGED:"+JSON.stringify(event))}>
                    <Section canMove={true} canEdit={true}>
                        <Item canEdit={false}>Item 1</Item>
                        <Item>Item 2</Item>
                        <Item>Item 3</Item>
                        <Item>Item 4</Item>
                        <Item>Item 5</Item>
                        <Item>Item 6</Item>
                        <Item>Item 7</Item>
                        <Item>Item 8</Item>
                    </Section>
                </TableView>
            </View>
        );
    }
}
class ListViewExample extends React.Component {
    constructor(props){
        super(props);
        this.numAdditionaItems = 1000;
        this.data = {};
        for (var i = 0; i < this.numAdditionaItems; ++i) {
            this.data[i] = i;
        }
        this.state = {dataSource: new React.ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })};
    }
    render() {
        const data = this.data;
        return (
            <React.ListView
                dataSource={this.state.dataSource.cloneWithRows(Object.keys(data))}
                renderRow={(k) => <Text onPress={(e)=>alert("item:"+k+", "+data[k])}> data: {data[k]}</Text>}
                />
        );
    }
}

class LargeTableExample extends React.Component {
    render() {
        var numAdditionaItems = 1000;
        var items = [];
        for (var i = 0; i < numAdditionaItems; ++i) {
            items.push(i);
        }
        return (
            <TableView reactModuleForCell="TableViewExampleCell" style={{flex:1}}
                           allowsToggle={true}
                           allowsMultipleSelection={true}
                           tableViewStyle={TableView.Consts.Style.Grouped}
                           onPress={(event) => alert(JSON.stringify(event))}>
                <Section label={"large section - "+numAdditionaItems+" items"} arrow={true}>
                    {items.map((i)=><Item key={i+1}>{i+1}</Item>)}
                </Section>
            </TableView>
        );
    }
}


class Launch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sectionLabel: 'Section'};
    }

    componentDidMount(){
        setTimeout(()=>this.setState({sectionLabel: 'Section #1'}));
    }
    render(){
        return (
            <TableView style={{flex:1}}>
                <Section label={this.state.sectionLabel}  arrow={true}>
                    <Item onPress={Actions.example1}>Example with custom cells</Item>
                    <Item onPress={Actions.example2}>Example with app bundle JSON data</Item>
                    <Item onPress={Actions.example3}>Example with multiple sections</Item>
                    <Item onPress={Actions.edit}>Example with editing mode</Item>
                    <Item onPress={Actions.example4}>Reusable Cell Example 1</Item>
                    <Item onPress={Actions.example5}>Reusable Custom Cells</Item>
                    <Item onPress={Actions.example6}>Firebase Example</Item>
                    <Item onPress={Actions.example7}>Large ListView (scroll memory growth)</Item>
                    <Item onPress={Actions.example8}>Reusable Large TableView Example</Item>
                </Section>
            </TableView>
        );
    }
}

class TableViewExample extends React.Component {
    render(){
        return (
            <Router>
                <Schema name="default" navBar={NavBar} sceneConfig={Animations.FlatFloatFromRight}/>
                <Route name="launch" component={Launch} title="TableView Demo"/>
                <Route name="example1" component={Example1} title="Example 1"/>
                <Route name="example2" component={Example2} title="Example 2"/>
                <Route name="example3" component={Example3} title="Example 3"/>
                <Route name="edit" component={Edit} title="Edit Table" hideNavBar={true}/>
                <Route name="example4" component={ReusableCellExample1} title="Reusable Cell Example 1"/>
                <Route name="example5" component={ReusableCellExample2} title="Reusable Custom Cells"/>
                <Route name="example6" component={FirebaseExample} title="Firebase Example"/>
                <Route name="example7" component={ListViewExample} title="Large ListView Example"/>
                <Route name="example8" component={LargeTableExample} title="Reusable Large TableView Example"/>
            </Router>

        );
    }
}

//Should be pure... setState on top-level component doesn't seem to work
class TableViewExampleCell extends React.Component {
    render(){
        var style = {borderColor:"#aaaaaa", borderWidth:1, borderRadius:3};
        //cell height is passed from <Item> child of tableview and native code passes it back up to javascript in "app params" for the cell.
        //This way our component will fill the full native table cell height.
        if (this.props.data.height !== undefined) {
            style.height = this.props.data.height;
        } else {
            style.flex = 1;
        }
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor;
        }
        return (<View style={style}><Text>section:{this.props.section},row:{this.props.row},label:{this.props.data.label}</Text></View>);
    }
}

//Should be pure... setState on top-level component doesn't seem to work
class DinosaurCellExample extends React.Component {
    yearsAgoInMil(num) {
        return ((-1 * num)/1000000)+" million years ago";
    }
    render(){
        var style = {};
        //cell height is passed from <Item> child of tableview and native code passes it back up to javascript in "app params" for the cell.
        //This way our component will fill the full native table cell height.
        if (this.props.data.height !== undefined) {
            style.height = this.props.data.height;
        }
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor;
        }
        style.borderColor = "grey";
        style.borderRadius = 0.02;

        var appeared = this.yearsAgoInMil(this.props.data.dinosaurappeared);
        var vanished = this.yearsAgoInMil(this.props.data.dinosaurvanished);
        return (<View style={style}>
            <Text style={{backgroundColor:"#4fa2c3"}}>Name: {this.props.data.dinosaurkey}</Text>
            <Text>Order:{this.props.data.dinosaurorder}</Text>
            <Text>Appeared: {appeared}</Text>
            <Text style={{backgroundColor:"lightgrey"}}>Vanished: {vanished}</Text>
            <Text>Height: {this.props.data.dinosaurheight}</Text>
            <Text>Length: {this.props.data.dinosaurlength}</Text>
            <Text>Weight: {this.props.data.dinosaurweight}</Text>
        </View>);
    }
}



AppRegistry.registerComponent('TableViewExample', () => TableViewExample);
AppRegistry.registerComponent('TableViewExampleCell', () => TableViewExampleCell);
AppRegistry.registerComponent('DinosaurCellExample', () => DinosaurCellExample);
