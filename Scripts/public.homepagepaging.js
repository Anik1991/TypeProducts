

var HomePagePaging = {
    loadWaiting: false,
    enumType: 0,
    productTypeDiv: {
        bestSeller: 1,
        homePageProduct: 2,
        newProduct: 3,
        properties: {
            1: { url: "/TypeProducts/HomepageBestSellersPaging", div: ".resp-tabs-container", hidingDiv: ".best-seller-product-footer", page: 1, totalPage: 32000 },
            2: { url: "/TypeProducts/HomePageProductsPaging", div: ".resp-tabs-container", hidingDiv: ".home-page-product-footer", page: 1, totalPage: 32000 },
            3: { url: "/TypeProducts/NewProductsOnHomePagePaging", div: ".resp-tabs-container", hidingDiv: ".new-product-footer", page: 1, totalPage: 32000 }
        }
    },
    init: function (homepageCount,bestsellerCount,newCount) {
        HomePagePaging.enumType = this.productTypeDiv.homePageProduct;
        HomePagePaging.productTypeDiv.properties[HomePagePaging.productTypeDiv.homePageProduct].totalPage = homepageCount;
        HomePagePaging.productTypeDiv.properties[HomePagePaging.productTypeDiv.bestSeller].totalPage = bestsellerCount;
        HomePagePaging.productTypeDiv.properties[HomePagePaging.productTypeDiv.newProduct].totalPage = newCount;
        this.loadWaiting = false;
        HomePagePaging.defineDiv(this.productTypeDiv.homePageProduct);
    },


    setLoadWaiting: function (display) {
        displayAjaxLoading(display);
        this.loadWaiting = display;
    },
    defineDiv: function (eType) {
        this.enumType = eType;
        if (gridcontent != null) {
            gridcontent.shuffle('shuffle', function ($el, shuffle) {
                return $el.data('group') == 'Home';
                // return true;
            })
        }
        
        if (HomePagePaging.productTypeDiv.properties[this.enumType].page >= HomePagePaging.productTypeDiv.properties[this.enumType].totalPage) {
            $(".home-page-product-footer").hide();
        }
        else {
            $(".home-page-product-footer").show();
        }

    },
    addProuduct: function () {
        this.setLoadWaiting(true);
        if (this.productTypeDiv.properties[HomePagePaging.enumType].page >= this.productTypeDiv.properties[HomePagePaging.enumType].totalPage) {
            alert("No Product available");
            this.setLoadWaiting(false);
            return;
        }
        console.log(this.productTypeDiv.properties[this.enumType].url + "," + this.productTypeDiv.properties[this.enumType].page);
        $.ajax({
            cache: false,
            url: this.productTypeDiv.properties[this.enumType].url,
            data: { pageIndex: this.productTypeDiv.properties[this.enumType].page },
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
        //this.setLoadWaiting(false);
    },
    success_process: function (response) {
        HomePagePaging.productTypeDiv.properties[HomePagePaging.enumType].page++;
        $(HomePagePaging.productTypeDiv.properties[HomePagePaging.enumType].div).append(response.html);
        if (response.html === "") {
            $(HomePagePaging.productTypeDiv.properties[HomePagePaging.enumType].hidingDiv).hide();
        }
        HomePagePaging.productTypeDiv.properties[HomePagePaging.enumType].totalPage = response.pageCount;
        if (HomePagePaging.productTypeDiv.properties[HomePagePaging.enumType].page >= HomePagePaging.productTypeDiv.properties[HomePagePaging.enumType].totalPage) {
            $(".home-page-product-footer").hide();
        }
        return false;
    },
    resetLoadWaiting: function () {
        HomePagePaging.setLoadWaiting(false);
    },

    ajaxFailure: function () {
        HomePagePaging.setLoadWaiting(false);
        alert('Failed to add the product. Please refresh the page and try one more time.');
    }
};