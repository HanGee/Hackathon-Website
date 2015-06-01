var ringer = {
  countdown_to: "6/13/2015",
  rings: {
    'DAYS': { 
      s: 86400000, // mseconds in a day,
      max: 365
    },
    'HOURS': {
      s: 3600000, // mseconds per hour,
      max: 24,
      cur: 0
    },
    'MINS': {
      s: 60000, // mseconds per minute
      max: 60,
      cur: 0
    },
    'SECS': {
      s: 1000,
      max: 60,
      cur: 0
    },
    'MSEC': {
      s: 10,
      max: 100,
      cur: 0
    }
   },
  r_count: 5,
  r_spacing: 2, // px
  r_size: 90, // px
  r_thickness: 2, // px
  update_interval: 16, // ms
  degreeUnit: Math.PI / 180,
  perLine: 1,
  horizontalMargin: 0,
  verticalMargin: 0,
  labelSize: 12,
  dispSize: 40,
    
  init: function(){
   
    $r = ringer;
    $r.cvs = document.getElementById('countdown-timer'); 
    $r.cvs = $('#countdown-timer');

	$r.r_size = Math.floor(($r.cvs.width() - $r.r_spacing) / $r.r_count) - $r.r_spacing - $r.r_thickness * 2;
	$r.labelSize = Math.floor($r.r_size / 7);
	$r.dispSize = Math.floor($r.r_size / 2);

	// Figure out how many ringer per line and determine size of canvas
	var width = $r.cvs.width();
	var height = $r.cvs.height();
	var unitSize = $r.r_size + $r.r_thickness;
	if (unitSize * 2 + $r.r_spacing <= width) {
		$r.perLine = Math.floor(($r.cvs.width() - $r.r_spacing) / (unitSize + $r.r_spacing));
		unitSize += $r.r_spacing;
		width = unitSize * $r.perLine + $r.r_spacing;
		height = unitSize * Math.ceil($r.r_count / $r.perLine) + $r.r_spacing;
		$r.horizontalMargin = ($r.cvs.width() - width) * .5;
	}

    $r.size = { 
		width: $r.cvs.width(),
		height: height
    };

	$r.cvs.attr({
		width: $r.cvs.width(),
		height: height
	});

    $r.cvs.css({
		width: $r.size.w + "px",
		height: $r.size.h + "px"
	});

	$r.verticalMargin = ($r.cvs.height() - height) * .5;

    $r.ctx = $r.cvs[0].getContext('2d');
    $r.ctx.textAlign = 'center';
    $r.actual_size = $r.r_size + $r.r_thickness;
    $r.countdown_to_time = new Date($r.countdown_to).getTime();
    $r.go();
  },
  ctx: null,
  go: function(){
    var idx = 0;
    
    $r.time = (new Date().getTime()) - $r.countdown_to_time;
    
    for(var r_key in $r.rings) {
		$r.unit(idx++, r_key, $r.rings[r_key]);      
	}
    
    setTimeout($r.go,$r.update_interval);
  },
  unit: function(idx,label,ring) {
    var value, ring_secs = ring.s;
    value = parseFloat($r.time/ring_secs);
    $r.time -= Math.round(parseInt(value)) * ring_secs;
    value = Math.abs(value);

	// Nothing's changed
	if (value == ring.cur)
		return;

	ring.cur = value;

	var unitSize = $r.actual_size + $r.r_spacing;

	var x, y;
	x = $r.horizontalMargin + $r.r_spacing + (idx % $r.perLine) * unitSize;
	y = $r.verticalMargin + $r.r_spacing + unitSize * Math.floor(idx / $r.perLine);

	// Center
	var r = ($r.r_size + $r.r_thickness) * .5;
    var cx = x + r;
    var cy = y + r;
    
    // calculate arc end angle
    var degrees = 360 - (value / ring.max) * 360.0;
    var endAngle = degrees * $r.degreeUnit;
    
    $r.ctx.save();

	// Clear
    $r.ctx.moveTo(x,y);
    $r.ctx.clearRect(x, y, $r.actual_size + 1,$r.actual_size + 1);

    $r.ctx.translate(cx,cy);

    // first circle
    var circleR = $r.r_size * .5;
    $r.ctx.strokeStyle = "rgba(128,128,128,0.4)";
    $r.ctx.beginPath();
    $r.ctx.arc(0,0,circleR,0,2 * Math.PI, 2);
    $r.ctx.lineWidth = $r.r_thickness;
    $r.ctx.stroke();
   
    // second circle
    $r.ctx.strokeStyle = "rgba(250, 253, 50, 1)";
    $r.ctx.beginPath();
    $r.ctx.arc(0,0,circleR,0,endAngle, 1);
    $r.ctx.lineWidth = $r.r_thickness;
    $r.ctx.stroke();

    // label
    $r.ctx.fillStyle = "#ffffff";
   
    $r.ctx.font = $r.labelSize + 'px Helvetica';
    $r.ctx.fillText(label, 0, $r.labelSize * 2);
    
    $r.ctx.font = 'bold ' + $r.dispSize + 'px Helvetica';
    $r.ctx.fillText(Math.floor(value), 0, $r.dispSize / 4);
    
    $r.ctx.restore();
  }
}

ringer.init();
