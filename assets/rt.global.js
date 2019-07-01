function removeWishlist(e) {
    "undefined" != typeof e && e.preventDefault();
    var o = $(this),
        i = o.closest(".item"),
        r = o.closest("form");
    $.ajax({
        type: "POST",
        url: "/contact",
        data: r.serialize(),
        beforeSend: function () {
            $("body").addClass("is_loading")
        },
        success: function () {
            $("body").removeClass("is_loading"), i.fadeOut(500)
        },
        error: function () {
            var e = "#error-ctl",
                o = jQuery(e),
                i = $.parseJSON(t.responseText);
            o.find(".title").html(i.message), o.find(".message").html(i.description), setTimeout(function () {
                roar.showThemeCtl(e), jQuery("body").removeClass("is_loading"), roar.timeout = setTimeout(function () {
                    roar.closeThemeCtl()
                }, 5e3)
            }, 500)
        }
    })
}

function addToWishlist(t) {
    "undefined" != typeof t && t.preventDefault();
    var e = $(this).data("id"),
        o = $("body").find(".wishlist-" + e + " .add-to-wishlist"),
        i = $("body").find(".product-buttons .wishlist-" + e + " .add-to-wishlist").first(),
        r = i.closest("form");
    $.ajax({
        type: "POST",
        url: "/contact",
        async: !0,
        data: r.serialize(),
        cache: !1,
        beforeSend: function () {
            $("body").addClass("is_loading")
        },
        success: function () {
            var t = i.closest(".product"),
                e = "#wishlist-ctl",
                r = jQuery(e);
            r.find(".product-link").attr("href", t.find(".product-title a").attr("href")), r.find(".product-img").attr("src", t.find(".product-image img").attr("src")).attr("alt", t.find(".product-title a").html()), r.find(".product-title .product-link").html(t.find(".product-title a").html()), r.find(".product-price").html(t.find(".product-price .price").html()), o.each(function () {
                $(this).removeClass("add-to-wishlist").addClass("added").attr("title", $(this).attr("data-added")), $(this).find("span").html($(this).attr("data-added")), $(this).find("i").removeClass("fa-heart-o").addClass("fa-heart")
            }), setTimeout(function () {
                jQuery("body").removeClass("is_loading"), roar.showThemeCtl2(e), roar.timeout = setTimeout(function () {
                    roar.closeThemeCtl2()
                }, 5e3)
            }, 500)
        },
        error: function (t) {
            var e = "#error-ctl",
                o = jQuery(e),
                i = $.parseJSON(t.responseText);
            o.find(".heading").html(i.message), o.find(".message").html(i.description), setTimeout(function () {
                jQuery("body").removeClass("is_loading"), roar.showThemeCtl2(e), roar.timeout = setTimeout(function () {
                    roar.closeThemeCtl2()
                }, 5e3)
            }, 500)
        }
    })
}

function updateCart() {
    Shopify.getCart(function (e) {
        setTimeout(function () {
            jQuery("body").removeClass("is_loading"),
            roar.timeout = setTimeout(function () {
                roar.closeThemeCtl2()
            }, 5e3)
        }, 500), Shopify.updateCartInfo(e, ".cart-info")
    })
}

function addToCart(t) {
    roar.closeThemeCtl2(), "undefined" != typeof t && t.preventDefault();
    var e = $(this),
        o = e.closest("form");
    if (0 == o.serialize().length) {
        var i = e.parents(".product-information");
        o = i.find("form.product-actions")
    }
    return window.ajax_add_to_cart ? void $.ajax({
        type: "POST",
        url: $("base").attr("href") + "cart/add.js",
        async: !0,
        data: o.serialize(),
        dataType: "json",
        beforeSend: function () {
            $("body").addClass("is_loading")
        },
        error: function (t) {
            var e = "#error-ctl",
                o = jQuery(e),
                i = $.parseJSON(t.responseText);
            o.find(".heading").html(i.message), o.find(".message").html(i.description), setTimeout(function () {
                jQuery("body").removeClass("is_loading"), roar.showThemeCtl2(e), roar.timeout = setTimeout(function () {
                    roar.closeThemeCtl2()
                }, 5e3)
            }, 500)
        },
        success: function (t) {
            Shopify.getCart(function (e) {
                var i = parseInt(o.find('input[name="quantity"]').val()),
                    r = "#cart-ctl",
                    a = jQuery(r);
                a.find(".product-link").attr("href", t.url), a.find(".product-img").attr("src", Shopify.resizeImage(t.image.src, "original")).attr("alt", t.title), a.find(".product-title .product-link").html(t.title), a.find(".product-price").html(Shopify.formatMoney(t.price, window.money_format)), a.find(".product-qty span").html(i), a.find(".product-total span").html(Shopify.formatMoney(t.price * i, window.money_format)), a.find(".product-subtotal span").html(Shopify.formatMoney(e.total_price, window.money_format)), window.show_multiple_currencies && currenciesCallbackSpecial("#cart-ctl span.money"), setTimeout(function () {
                    jQuery("body").removeClass("is_loading"), roar.showThemeCtl2(r), roar.timeout = setTimeout(function () {
                        roar.closeThemeCtl2()
                    }, 5e3)
                }, 500), Shopify.updateCartInfo(e, ".cart-info")
            })
        },
        cache: !1
    }) : void o.submit()
}

function searchPlaceholder() {
    Modernizr.input.placeholder || ($("#top-search-input").focus(function () {
        var t = $(this);
        t.val() == t.attr("placeholder") && (t.val(""), t.removeClass("placeholder"))
    }).blur(function () {
        var t = $(this);
        ("" == t.val() || t.val() == t.attr("placeholder")) && (t.addClass("placeholder"), t.val(t.attr("placeholder")))
    }).blur(), $("[placeholder]").parents("form").submit(function () {
        $(this).find("[placeholder]").each(function () {
            var t = $(this);
            t.val() == t.attr("placeholder") && t.val("")
        })
    }))
} ! function (t) {
    function e() { }
    for (var o, i = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(",") ; o = i.pop() ;) t[o] = t[o] || e
}(function () {
    try {
        return console.log(), window.console
    } catch (t) {
        return window.console = {}
    }
}());
var GLOBAL = {
    common: {
        init: function () {
            updateCart()
            $("html").removeClass("no-js").addClass("js"), searchPlaceholder(), $("body").on("click", ".add-to-cart", addToCart), $("body").on("click", ".add-to-wishlist", addToWishlist), $("body").on("click", ".remove-wishlist", removeWishlist)
        }
    }
}, UTIL = {
    fire: function (t, e, o) {
        var i = GLOBAL;
        e = void 0 === e ? "init" : e, "" !== t && i[t] && "function" == typeof i[t][e] && i[t][e](o)
    },
    loadEvents: function () {
        var t = document.body.id;
        UTIL.fire("common"), $.each(document.body.className.split(/\s+/), function (e, o) {
            UTIL.fire(o), UTIL.fire(o, t)
        })
    }
};
$(document).ready(UTIL.loadEvents);
