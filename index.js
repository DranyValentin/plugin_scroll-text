(function()
{
// Scroll Text
	// Function of Scroll
		function deltaY(event)
		{
			var delta = event.deltaY

			if ( delta < 90 && delta > 0 )
				delta = 100
			if ( delta < 0 && delta > -90 )
				delta = -100

			return delta
		}

		function listenerMouse(event)
		{
			var pageY = event.pageY

			if ( keyInitialCoordY )
			{
				initialCoordY = initialCoordY - ($cursorScrollVertical.offsetTop - containerStartCoordY)
				keyInitialCoordY = false
			}

			var deltaCoordY = pageY - initialCoordY
			var scrollOffsetY = lengthText * deltaCoordY / containerTextHeight

			if ( currentCoordY != pageY && containerStartCoordY < pageY && containerEndCoordY > pageY )
			{
				if ( containerHeightWithoutScroll > deltaCoordY && 0 < deltaCoordY )
				{
					$text.scrollTop = scrollOffsetY
					$cursorScrollVertical.style.top = deltaCoordY + 'px'
				}
				else if ( containerHeightWithoutScroll < deltaCoordY )
				{
					$text.scrollTop = scrollOffsetY
					$cursorScrollVertical.style.top = containerHeightWithoutScroll + 'px'
				}
				else if ( 0 > deltaCoordY )
				{
					$text.scrollTop = scrollOffsetY
					$cursorScrollVertical.style.top = '0px'
				}
			}

			currentCoordY = pageY
			
			event.preventDefault();	
		}

		function listenerWheel(event)
		{
			$text.scrollTop += deltaY(event)
			$cursorScrollVertical.style.top = containerTextHeight * $text.scrollTop / lengthText + 'px'

		  	event.preventDefault();
		}

		function listenerTouch(event)
		{
			var pageY = event.pageY

			if ( currentCoordY > pageY)
			{
				$text.scrollTop += 20
				$cursorScrollVertical.style.top = containerTextHeight * $text.scrollTop / lengthText + 'px'
			}
			else
			{
				$text.scrollTop -= 20
				$cursorScrollVertical.style.top = containerTextHeight * $text.scrollTop / lengthText + 'px'	
			}
					
			currentCoordY = pageY
			
			event.preventDefault();	
		}

		function listenerTouchStart(event)
		{
			initialCoordY = event.pageY
			currentCoordY = initialCoordY
			keyInitialCoordY = true

			window.addEventListener('touchmove', listenerTouch)

		  	event.preventDefault();
		}

	// Initialization Varibales
	var $containerScrollVertical = document.querySelector('.scroll_vertical')
	if ($containerScrollVertical)
	{
		var $cursorScrollVertical = $containerScrollVertical.querySelector('div')
	
		var $text = document.querySelector('.text_main')
		var lengthText
		var containerTextHeight
		var containerStartCoordY
		var containerEndCoordY
		var scrollHeight
		var scrollEndCoordY
		var containerHeightWithoutScroll
		var initialCoordY = 0
		var	currentCoordY = 0
		var keyInitialCoordY = true

		//Listeners mouse and touch	
		setTimeout(function()
		{	
			lengthText = $text.scrollHeight
			containerTextHeight = $text.offsetHeight
			$containerScrollVertical.style.height = containerTextHeight + 'px'
			containerStartCoordY = $text.offsetTop
			containerEndCoordY = containerStartCoordY + containerTextHeight
			$cursorScrollVertical.style.height = containerTextHeight * containerTextHeight  / lengthText + 'px'
			scrollHeight = $cursorScrollVertical.offsetHeight
			scrollEndCoordY = containerStartCoordY + scrollHeight
			containerHeightWithoutScroll = containerTextHeight - scrollHeight
		},200)

		if ( window.innerWidth > 768 )
		{
			$text.addEventListener('wheel', listenerWheel)
			$text.addEventListener('touchstart', listenerTouchStart)
			$containerScrollVertical.addEventListener('wheel', listenerWheel) 
		}

		window.addEventListener('resize', function()
		{
			if ( innerWidth <= 768 )
			{
				$containerScrollVertical.style.height = 'auto'
				$cursorScrollVertical.style.height = 'auto'
				$containerScrollVertical.classList.remove('scroll_vertical')
				$text.removeEventListener('wheel', listenerWheel)
				$text.removeEventListener('touchstart', listenerTouchStart)
				$containerScrollVertical.removeEventListener('wheel', listenerWheel)
				
			}
			else
			{
				$containerScrollVertical.classList.add('scroll_vertical') 

				lengthText = $text.scrollHeight
				containerTextHeight = $text.offsetHeight
				$containerScrollVertical.style.height = containerTextHeight + 'px'
				containerStartCoordY = $text.offsetTop
				containerEndCoordY = containerStartCoordY + containerTextHeight

				$cursorScrollVertical.style.height = containerTextHeight * containerTextHeight  / lengthText + 'px'
				scrollHeight = $cursorScrollVertical.offsetHeight
				scrollEndCoordY = containerStartCoordY + scrollHeight
				containerHeightWithoutScroll = containerTextHeight - scrollHeight

				initialCoordY = 0
				currentCoordY = 0
				keyInitialCoordY = true

				$text.addEventListener('wheel', listenerWheel)
				$text.addEventListener('touchstart', listenerTouchStart)
				$containerScrollVertical.addEventListener('wheel', listenerWheel) 
			}
		})

		$cursorScrollVertical.addEventListener('mousedown', function(event)
		{
			initialCoordY = event.pageY
			currentCoordY = initialCoordY
			keyInitialCoordY = true

			window.addEventListener('mousemove', listenerMouse)

		  	event.preventDefault();
		})

		window.addEventListener('mouseup', function(event)
		{
			window.removeEventListener('mousemove', listenerMouse)
		})
			
		window.addEventListener('touchend', function(event)
		{
			window.removeEventListener('touchmove', listenerTouch)
		})
	}

//End Scroll Text

})();

